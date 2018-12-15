import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loginUrl = '/boot/user/login';  // 登陆api
  private logonUrl = '/boot/user/logon';  // 注册api
  private userDetailUrl = '/boot/user/detail';  // 用户详情api

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, {
      'username': username,
      'password': password
    }, httpOptions);
  }

  logon(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.logonUrl, {
      'username': username,
      'password': password
    }, httpOptions);
  }

  getUserDetail(username: string): Observable<any> {
    return this.http.get<any>(this.userDetailUrl, {
      params: {
        'username': username
      }
    });
  }

}
