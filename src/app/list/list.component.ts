import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../service/playlist.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  constructor(private _playlist: PlaylistService) { }

  ngOnInit() {
    this._playlist.playlistListData.subscribe(root => {
      console.log(root);
    });
  }

}
