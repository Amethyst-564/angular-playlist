import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../service/playlist.service';

// 引入Lodash
import * as _ from 'lodash';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.less']
})
export class PlaylistComponent implements OnInit {

  listId;
  listTitle;
  listCover;

  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.getDetails();
  }

  getDetails(): void {
    this.playlistService.getDetails().subscribe(root => {
      console.log('获取到歌单json');
      // 歌单号
      this.listId = root.result.id;
      // 歌单名
      this.listTitle = root.result.name;
      // 歌单封面图
      this.listCover = root.result.coverImgUrl;
      // 拼装json
      const tracks = _.map(root.result.tracks, (track) => {
        const artists = track.artists;
        let songArtists = '';
        _.each(artists, (artist, index) => {
          songArtists = artist.name + ', ';
        });
        // 去掉string尾指定字符
        songArtists = _.trimEnd(songArtists, ', ');

        return {
          'songTitle': track.name,
          'songArtists': songArtists
        };
      });

      console.log('tracks: ', tracks);
    });
  }

}
