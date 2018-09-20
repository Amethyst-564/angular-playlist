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
  tracks;

  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.getDetails();
  }

  getDetails(): void {
    this.playlistService.getDetails().subscribe(root => {

      console.log('获取到歌单json');

      let count = 1;

      // 歌单号
      this.listId = root.result.id;

      // 歌单名
      this.listTitle = root.result.name;

      // 歌单封面图
      this.listCover = root.result.coverImgUrl;

      // 拼装json
      this.tracks = _.map(root.result.tracks, (track) => {

        // 歌曲标题
        const songTitle = track.name;

        // 艺术家们
        const artists = track.artists;
        let songArtists = '';
        _.each(artists, (artist) => {
          songArtists = artist.name + ', ';
        });
        // 去掉string尾指定字符
        songArtists = _.trimEnd(songArtists, ', ');

        // 专辑名称
        const album = track.album.name;

        // 歌曲时长
        let duration = track.duration;
        duration = _.floor(duration / 1000);
        let min: any = _.floor(duration / 60);
        // 补全时间为2位数显示
        if (min < 10) {
          min = '0' + min;
        }
        const sec = duration % 60;
        duration = min + ':' + sec;


        return {
          'id': count++,
          'songTitle': songTitle,
          'songArtists': songArtists,
          'album': album,
          'duration': duration,
        };
      });

      console.log('tracks: ', this.tracks);
    });
  }

}
