import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { PlaylistService } from '../service/playlist.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoginComponent } from '../login/login.component';

import * as _ from 'lodash';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
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
  detailList = [];
  curDetail = {
    add_time: '',
    content: '',
    cover: '',
    playlist_detail_id: '',
  };
  trackCount = '';
  sourceType = '';

  flgs = {
    isLastOne: false,
  };

  constructor(private playlistService: PlaylistService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this._route.params.subscribe(params => {
      if (params.pid) {
        this.getDetailsFromRemote(params.pid);
      } else if (params.playlistId) {
        this.getDetailsFromLocal(params.playlistId);
      } else {
        this._router.navigate(['/error'], { queryParams: { type: '1', code: '2' } });
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
    // local源
    this.sourceType = 'local';

    this.playlistService.getDetailsFromLocal(playlistId).subscribe(root => {
      if (root.code === 0) {
        this.listId = root.data.pid;
        this.listTitle = root.data.name;
        // sort detailList
        this.detailList = _.orderBy(root.data.detail, ['add_time'], ['desc']);
        _.each(this.detailList, (detail) => {
          // format dataStr
          detail.add_time = moment(detail.add_time).format('YYYY-MM-DD HH:mm:ss');
        });
        this.curDetail = this.detailList[0];
        this.listCover = this.curDetail.cover;
        this.tracks = JSON.parse(this.curDetail.content);
        this.trackCount = this.tracks.length;

        // 判断是否最后一条记录
        if (root.data.detail.length === 1) {
          this.flgs.isLastOne = true;
        }
      } else {
        this._router.navigate(['/error'], { queryParams: { type: '1', code: root.code } });
      }
    });
  }

  getDetailsFromRemote(id: string): void {
    // remote源
    this.sourceType = 'remote';

    this.playlistService.getDetailsFromRemote(id).subscribe(root => {
      if (root.code === 200) {
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
      } else if (root.code === 404) {
        this._router.navigate(['/error'], { queryParams: { type: '1', code: 404 } });
      } else {
        this._router.navigate(['/error'], { queryParams: { type: '1', code: 2 } });
      }

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
      if (root.code === 0) {
        if (this.flgs.isLastOne) {
          this._router.navigate(['/list']);
        } else {
          location.reload();
        }
      }
    });
  }

  selectDetailVersion(playlistDetailId: any) {
    const findResult = _.find(this.detailList, { 'playlist_detail_id': playlistDetailId });
    this.curDetail = findResult;
    this.tracks = JSON.parse(findResult.content);
    this.trackCount = this.tracks.length;
  }

  exportFile() {
    // if (this.sourceType === 'local') {

    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      ['基本信息'],
      ['歌单名称', this.listTitle],
      ['网易云曲库pid', this.listId],
      ['歌单封面图片链接', this.listCover],
      [],
      ['歌单详情'],
      ['歌曲标题', '艺术家', '专辑名称', '时长', '试听链接']
    ]);
    XLSX.utils.sheet_add_json(ws, this.tracks, {
      origin: 'A8',
      skipHeader: true,
    });

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    if (!wb.Props) {
      wb.Props = {};
    }
    wb.Props.Author = '歌单拯救计划';
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, `${this.listId}_${this.listTitle}.xlsx`);
    // }

    // if (this.sourceType === 'remote') {

    // }
  }

}
