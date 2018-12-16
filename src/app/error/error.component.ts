import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less']
})
export class ErrorComponent implements OnInit {

  type: string;  // 0:404 1:error
  code: string;
  errorData = {
    title: '',
    msg: '',
    redirectTo: '',
    url: '',
  };

  errorEnum = {
    0: {
      msg: '该页面不存在',
      redirectTo: '主页',
      url: '/',
    },
    1: {
      msg: '您还未登录',
      redirectTo: '登录页面',
      url: '/login',
    },
    1001: {
      msg: '参数不正确',
      redirectTo: '主页',
      url: '/',
    }
  };

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    // type默认0
    this.type = this._route.snapshot.queryParamMap.get('type') || '0';
    this.code = this._route.snapshot.queryParamMap.get('code');
  }

  ngOnInit() {
    this.initError();
  }

  public initError() {
    if (this.type === '0') {
      this.errorData.title = '4😵4';
      // code 默认0
      const code = this.code || '0';
      this.errorData.msg = this.errorEnum[code].msg;
      this.errorData.redirectTo = this.errorEnum[code].redirectTo;
      this.errorData.url = this.errorEnum[code].url;
    }
    if (this.type === '1') {
      this.errorData.title = 'ERR😵R';
      // code 默认1
      const code = this.code || '1';
      this.errorData.msg = this.errorEnum[code].msg;
      this.errorData.redirectTo = this.errorEnum[code].redirectTo;
      this.errorData.url = this.errorEnum[code].url;
    }
    setTimeout(() => {
      this.redirectTo();
    }, 3000);
  }

  public redirectTo() {
    this._router.navigate([this.errorData.url]);
  }

}
