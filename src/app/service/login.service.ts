import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(username: string, password: string): void {
    console.log('调用登陆api成功');
    console.log(username, password);
  }
}
