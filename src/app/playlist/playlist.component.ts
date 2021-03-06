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

  listId;
  listTitle;
  listCover;
  tracks;
  link;
  curTrack;

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

  // OnDestroy() {
  //   this.playlistService.searchData.unsubscribe();
  // }

  get userInfo(): any {
    return JSON.parse(localStorage.getItem('loginInfo'));
  }

  getDetails(id: string): void {

    this.playlistService.getDetails(id).subscribe(root => {

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

      console.log(this.tracks);
      // console.log('tracks: ', this.tracks);
      // setTimeout(() => {
      //   const el = document.getElementById('modal-center');

      // }, 3000);

    });
  }

  showModal(track) {
    this.curTrack = track;

    // jQuery方式
    // $('#modal-center').modal('show');
    // 取DOM对象然后转换成jQuery对象
    // const el = document.getElementById('modal-center');
    // $(el).modal('show');
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
    const user_id = LoginComponent.getUserId();
    if (user_id === undefined) {
      console.log('用户未登录');
    } else {
      // JSON.stringify将json对象转为json字符串
      // JSON.parse()将json字符串转为json对象
      const tracks = JSON.stringify(this.tracks);
      this.playlistService.save({
        'user_id': user_id,
        'playlist_name': this.listTitle,
        'pid': this.listId,
        'playlist_cover': this.listCover,
        'playlist_content': tracks
      }).subscribe(root => {
        console.log(root);
      });
    }

  }



}
