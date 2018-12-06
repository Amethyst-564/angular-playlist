import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../service/playlist.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  playlistList;

  constructor(
    private _playlist: PlaylistService,
    private route: ActivatedRoute,
  ) {
    console.log('constructor');
    const username = this.route.snapshot.queryParamMap.get('username');
    this.getPlaylistList(username);
  }

  ngOnInit() {
    console.log('init');
  }

  public getPlaylistList(username: string) {
    this._playlist.getPlaylistList(username).subscribe(root => {
      this.playlistList = root.data;
    });
  }

}
