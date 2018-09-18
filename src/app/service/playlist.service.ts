import { Injectable } from '@angular/core';
// 引入http客户端
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Accept': '	text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    // 'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,en-US;q=0.7,en;q=0.3',
    // 'Connection': '	keep-alive',
    // 'Host': '	music.163.com',
    'Upgrade-Insecure-Requests': '1',
    // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:62.0) Gecko/20100101 Firefox/62.0'
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
