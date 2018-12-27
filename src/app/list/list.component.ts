import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../service/playlist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';

import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  loginInfo: any;
  userDetail = {
    user_id: '',
    user_alias: '',
    user_icon: '',
    user_description: '',
  };
  playlistList: any;

  constructor(
    private _playlist: PlaylistService,
    private _user: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
  }

  ngOnInit() {
    this.getPlaylistList();
    this.getUserDetail();
  }

  public getPlaylistList() {
    if (!this.loginInfo) {
      this._router.navigate(['/error'], { queryParams: { type: '1', code: '1' } });
    } else {
      this._playlist.getList(this.loginInfo.username).subscribe(root => {
        console.log(root);
        this.playlistList = root.data;
        _.each(this.playlistList, (playlist) => {
          const latestDetail = _.sortBy(playlist.detail, ['add_time'])[playlist.detail.length - 1];
          playlist.latest_time = moment(latestDetail.add_time).format('YYYY-MM-DD HH:mm:ss');
          playlist.latest_cover = latestDetail.cover;
        });
      });
    }
  }

  public getUserDetail() {
    if (!this.loginInfo) {
      this._router.navigate(['/error'], { queryParams: { type: '1', code: '1' } });
    } else {
      this._user.getUserDetail(this.loginInfo.username).subscribe(root => {
        console.log(root);
        this.userDetail = root.data;
      });
    }
  }

  public toPlaylist(playlistId: string) {
    this._router.navigate(['/playlist/l', playlistId]);
  }

  public deletePlaylist(playlistId: string) {
    this._playlist.deleteInfo(playlistId).subscribe(root => {
      console.log(root);
      if (root.code === 0) {
        this.getPlaylistList();
      } else {
        this._router.navigate(['/error'], { queryParams: { type: '1', code: root.code } });
      }
    });
  }

}
