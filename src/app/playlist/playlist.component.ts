import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../service/playlist.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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
  link;

  constructor(private playlistService: PlaylistService,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.params.subscribe(params => {
      this.getDetails(params.id);

    });
  }

  ngOnInit() {
    // // 获得next处发送来的数据
    // this.playlistService.searchData.subscribe(data => {
    //   this.getDetails(data);
    // });

    // this.link = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.playlistService.getDetails(params.get('id')))
    // );
  }

  // OnDestroy() {
  //   this.playlistService.searchData.unsubscribe();
  // }

  getDetails(id: string): void {
    this.playlistService.getDetails(id).subscribe(root => {

      console.log('获取到歌单json');

      // let count = 1;

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
        let sec: any = duration % 60;
        if (sec < 10) {
          sec = '0' + sec;
        }
        duration = min + ':' + sec;


        return {
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
