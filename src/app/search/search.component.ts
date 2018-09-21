import { Component, OnInit } from '@angular/core';
import { Link } from '../link';
import { PlaylistService } from '../service/playlist.service';
import { Router } from '@angular/router';
// 响应式表单
import { FormControl } from '@angular/forms';
// 表单验证器
import { Validators } from '@angular/forms';

import * as _ from 'lodash';

const regex = /.*(music\.163\.com\/){1}(.)+(\?id=){1}\d+.*/;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {


  link = new FormControl('', [Validators.required, Validators.pattern(regex)]);

  model = new Link('');

  constructor(
    private playlistService: PlaylistService,
    private _router: Router,
  ) { }

  ngOnInit() {
    // const re = new RegExp('^(.)*(music\.163\.com\/)(.)+\?id=(\d)+(.)*$');
    const re = new RegExp(/.*(music\.163\.com\/){1}(.)+(\?id=){1}\d+.*/);
    console.log(re.test('https://music.163.com/playlist?id=956408927&userid=31176983'));
  }

  parseLink() {

    const link = this.model.link;
    const start = link.indexOf('?id=') + 4;
    const end = link.indexOf('&userid=');
    let playlistId;

    if (end === -1) {
      playlistId = link.substring(start);
    } else {
      playlistId = link.substring(start, end);
    }

    console.log(start);
    console.log(end);
    console.log(playlistId);

    // // send data
    // this.playlistService.searchData.next(playlistId);
    this._router.navigate(['/playlist', playlistId]);

  }
}
