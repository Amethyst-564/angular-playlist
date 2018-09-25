import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = '/boot/user/login';  // 登陆api

  constructor(private http: HttpClient) { }


  login(username: string, password: string): Observable<any> {

    console.log('调用登陆api');

    return this.http.post<any>(this.url, {
      'username': username,
      'password': password
    }, httpOptions);
  }
}
