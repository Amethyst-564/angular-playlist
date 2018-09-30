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

  constructor(private http: HttpClient) { }

  getDetails(id: string): Observable<any> {

    const url = `${this.playlistUrl}?id=${id}`;
    console.log(url);
    return this.http.get<any>(url, httpOptions);
  }

  save(tracks: any): Observable<any> {

    console.log(this.saveUrl);
    return this.http.post<any>(this.saveUrl, tracks);
  }
}
