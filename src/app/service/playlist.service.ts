import { Injectable } from '@angular/core';
// 引入http客户端
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})

export class PlaylistService {

  constructor(private http: HttpClient) { }

  private url = '/api/playlist/detail?id=956408927';  // 曲库api

  getDetails(): Observable<any> {

    console.log(this.url);

    return this.http.get<any>(this.url, httpOptions);
  }
}
