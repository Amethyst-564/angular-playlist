import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { PlaylistService } from '../service/playlist.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoginComponent } from '../login/login.component';
// 引入Lodash
import * as _ from 'lodash';
declare var $;

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.less']
})
export class PlaylistComponent implements OnInit, AfterViewInit {

  listId: string;
  listTitle: string;
  listCover: string;
  tracks: any;
  curTrack: any;
  playlistDetailId: any;

  constructor(private playlistService: PlaylistService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this._route.params.subscribe(params => {
      if (params.pid) {
        this.getDetailsFromRemote(params.pid);
      } else if (params.playlistId) {
        this.getDetailsFromLocal(params.playlistId);
      } else {
        this._router.navigate(['/error'], { queryParams: { type: '1', code: '1001' } });
      }
    });

  }

  ngOnInit() {
    // // 获得next处发送来的数据
    // this.playlistService.searchData.subscribe(data => {
    //   this.getDetails(data);
    // });
  }

  ngAfterViewInit() {
    // 当modal完全加载时
    $('#modal-center').on('shown.bs.modal', function (e) {
      const audioPlayer = <HTMLVideoElement>document.getElementById('myaudio');

      audioPlayer.load();
      audioPlayer.play();

    });
    // 当modal开始关闭时
    $('#modal-center').on('hide.bs.modal', function (e) {
      const audioPlayer = <HTMLVideoElement>document.getElementById('myaudio');
      audioPlayer.pause();
    });

  }

  get userInfo(): any {
    return JSON.parse(localStorage.getItem('loginInfo'));
  }

  getDetailsFromLocal(playlistId: string): void {
    console.log('来自本地数据源');
    this.playlistService.getDetailsFromLocal(playlistId).subscribe(root => {
      console.log(root);
      this.listId = root.data.pid;
      this.listTitle = root.data.name;
      this.listCover = root.data.detail[0].cover;
      this.tracks = JSON.parse(root.data.detail[0].content);
      this.playlistDetailId = root.data.detail[0].playlist_detail_id;
    });
  }

  getDetailsFromRemote(id: string): void {

    this.playlistService.getDetailsFromRemote(id).subscribe(root => {

      console.log('获取到歌单json');

      // 歌单号
      this.listId = root.result.id;
      // 歌单名
      this.listTitle = root.result.name;
      // 歌单封面图
      this.listCover = root.result.coverImgUrl;

      // 拼装json
      this.tracks = _.map(root.result.tracks, (track) => {

        // 歌曲id
        const songId = track.id;
        const songUrl = `http://music.163.com/song/media/outer/url?id=${songId}.mp3`;

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
          'songUrl': songUrl
        };
      });

    });
  }

  showModal(track) {
    this.curTrack = track;
  }

  toDark() {
    document.getElementById('table').className = 'table table-dark table-hover';
    const btn = document.getElementsByClassName('audition') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < btn.length; i++) {
      btn[i].style.color = '#FFFFFF';
    }
  }

  toLight() {
    document.getElementById('table').className = 'table table-light table-hover';
    const btn = document.getElementsByClassName('audition') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < btn.length; i++) {
      btn[i].style.color = '#563d7c';
    }
  }

  save() {
    const userId = JSON.parse(localStorage.getItem('loginInfo')).userId;
    if (userId === undefined) {
      this._router.navigate(['/error'], { queryParams: { type: '1', code: '1' } });
    } else {
      const tracks = JSON.stringify(this.tracks);
      this.playlistService.save({
        'user_id': userId,
        'playlist_name': this.listTitle,
        'pid': this.listId,
        'playlist_cover': this.listCover,
        'playlist_content': tracks
      }).subscribe(root => {
        console.log(root);
      });
    }

  }

  delete(playlistDetailId: any) {
    this.playlistService.deleteDetail(playlistDetailId).subscribe(root => {
      console.log(root);
    });
  }

}
