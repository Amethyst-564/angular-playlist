import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../service/playlist.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  username: string;
  playlistList: any;

  constructor(
    private _playlist: PlaylistService,
    private route: ActivatedRoute,
  ) {
    console.log('constructor');
    // const username = this.route.snapshot.queryParamMap.get('username');
    this.username = JSON.parse(localStorage.getItem('loginInfo')).username;
  }

  ngOnInit() {
    console.log('init');
    this.getPlaylistList();
  }

  public getPlaylistList() {
    // const username = JSON.parse(localStorage.getItem('loginInfo')).username;
    if (!this.username) {
      console.log('用户未登录');
    } else {
      this._playlist.getPlaylistList(this.username).subscribe(root => {
        this.playlistList = root.data;
      });
    }
  }

}
