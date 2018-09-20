import { Component, OnInit } from '@angular/core';
import { Link } from '../link';
import { PlaylistService } from '../service/playlist.service';
import { Router } from '@angular/router';

import * as _ from 'lodash';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  model = new Link('');

  constructor(
    private playlistService: PlaylistService,
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  parseLink() {

    const link = this.model.link;

    const start = link.indexOf('?id=') + 4;
    const end = link.indexOf('&userid=');
    const playlistId = link.substring(start, end);

    console.log(start);
    console.log(end);
    console.log(playlistId);

    // // send data
    // this.playlistService.searchData.next(playlistId);
    this._router.navigate(['/playlist', playlistId]);

  }
}
