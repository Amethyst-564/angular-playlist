import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less']
})
export class ErrorComponent implements OnInit {

  type = 0;
  errorData = {
    content: '',
    redirectTo: '',
    url: '',
  };
  errorContent;

  constructor(private _router: Router) { }

  ngOnInit() {
    this.initError();
  }

  public initError(type?: number) {
    switch (type) {
      case 1:
        console.log('case 1');
        break;
      default:
        this.notfound();
        break;
    }
  }

  public notfound() {
    this.errorData.content = '该页面不存在';
    this.errorData.redirectTo = '主页';
    setTimeout(() => {
      this._router.navigate(['']);
    }, 3000);
  }

}
