import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../service/playlist.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  loginInfo: any;
  playlistList: any;

  constructor(
    private _playlist: PlaylistService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
  }

  ngOnInit() {
    this.getPlaylistList();
  }

  public getPlaylistList() {
    if (!this.loginInfo) {
      this._router.navigate(['/error'], { queryParams: { type: '1', code: '1' } });
    } else {
      this._playlist.getPlaylistList(this.loginInfo.username).subscribe(root => {
        this.playlistList = root.data;
      });
    }
  }

}
