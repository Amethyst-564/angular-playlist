import { Injectable } from '@angular/core';
// 引入http客户端
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
    // 'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})

export class PlaylistService {

  // // 新建一个Subject
  // searchData: Subject<any> = new Subject<any>();
  private playlistUrl = '/api/playlist/detail';  // 曲库api
  private saveUrl = '/boot/playlist/save';
  private playlistListUrl = '/boot/playlist/list';

  playlistListData: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) { }

  // 从外部库爬取歌单信息
  getDetails(id: string): Observable<any> {
    const url = `${this.playlistUrl}?id=${id}`;
    console.log(url);
    return this.http.get<any>(url, httpOptions);
  }

  // 将爬取的歌单信息持久化到库中
  save(tracks: any): Observable<any> {
    console.log(this.saveUrl);
    return this.http.post<any>(this.saveUrl, tracks);
  }

  // 获取用户保存的歌单
  getPlaylistList(username): Observable<any> {
    const param = {
      username: username
    };
    return this.http.get<any>(this.playlistListUrl, { params: param });
  }
}
