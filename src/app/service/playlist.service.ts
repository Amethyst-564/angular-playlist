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
  private remoteDetailUrl = '/api/playlist/detail';  // 远程曲库api
  private localDetailUrl = '/boot/playlist/detail';
  private saveUrl = '/boot/playlist/save';
  private listUrl = '/boot/playlist/list';
  private deleteInfoUrl = '/boot/playlist/delete_info';
  private deleteDetailUrl = '/boot/playlist/delete_detail';

  constructor(private http: HttpClient) { }

  // 从外部库爬取歌单信息
  getDetailsFromRemote(id: string): Observable<any> {
    const url = `${this.remoteDetailUrl}?id=${id}`;
    console.log(url);
    return this.http.get<any>(url, httpOptions);
  }

  getDetailsFromLocal(playlistId: string): Observable<any> {
    console.log(this.localDetailUrl);
    return this.http.get<any>(this.localDetailUrl, {
      params: {
        'id': playlistId,
      }
    });

  }

  // 将爬取的歌单信息持久化到库中
  save(tracks: any): Observable<any> {
    console.log(this.saveUrl);
    return this.http.post<any>(this.saveUrl, tracks);
  }

  // 获取用户保存的歌单
  getList(username: string): Observable<any> {
    console.log(this.listUrl);
    return this.http.get<any>(this.listUrl, {
      params: {
        'username': username,
      }
    });
  }

  deleteInfo(playlistId: string): Observable<any> {
    return this.http.delete<any>(this.deleteInfoUrl, {
      params: {
        'id': playlistId,
      }
    });
  }

  deleteDetail(playlistDetailId: string): Observable<any> {
    return this.http.delete<any>(this.deleteDetailUrl, {
      params: {
        'id': playlistDetailId,
      }
    });
  }
}
