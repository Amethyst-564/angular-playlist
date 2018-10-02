import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// 响应式表单 验证器
import { Validators, FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Result } from '../result';
import { NavbarComponent } from '../navbar/navbar.component';

const regex = /^[a-zA-Z0-9_]+$/;
let user_id;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  model = new Result(0, '');

  in_username = new FormControl('', {
    validators: [Validators.required, Validators.pattern(regex),
    Validators.minLength(4), Validators.maxLength(16)],
    updateOn: 'change'
  });

  in_password = new FormControl('', {
    validators: [Validators.required],
    updateOn: 'change'
  });

  on_username = new FormControl('', {
    validators: [Validators.required, Validators.pattern(regex),
    Validators.minLength(4), Validators.maxLength(16)],
    updateOn: 'change'
  });

  on_password = new FormControl('', {
    validators: [Validators.required],
    updateOn: 'change'
  });

  on_ackPassword = new FormControl('', {
    validators: [Validators.required],
    updateOn: 'change'
  });

  static getUserId() {
    return user_id;
  }

  constructor(private userService: UserService, private _router: Router) { }

  ngOnInit() {
  }

  login(username: string, password: string) {
    this.userService.login(username, password).subscribe(root => {
      const code = root.code;
      if (code === 0) {
        NavbarComponent.login(username);
        user_id = root.data.user_id;
        this._router.navigate(['search']);
      } else {
        this.model.code = code;
        this.model.msg = root.msg;
      }
    });
  }

  logon(username: string, password: string) {
    console.log(username, password);
    this.userService.logon(username, password).subscribe(data => {
      const code = data.code;
      if (code === 0) {
        this.model.code = code;
        this.model.msg = data.msg + '，3秒后跳转到登陆界面';
        setTimeout(() => {
          location.reload();
        }, 3000);
      } else {
        this.model.code = code;
        this.model.msg = data.msg;
      }
    });
  }

  toLogon() {
    document.getElementById('logon-form').style.display = 'initial';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('logon-footer').style.display = 'initial';
    document.getElementById('login-footer').style.display = 'none';
    document.getElementById('title').innerHTML = '加入我们，拯救你的歌单';
  }

  toLogin() {
    document.getElementById('login-form').style.display = 'initial';
    document.getElementById('logon-form').style.display = 'none';
    document.getElementById('login-footer').style.display = 'initial';
    document.getElementById('logon-footer').style.display = 'none';
    document.getElementById('title').innerHTML = '登陆账号，拯救你的歌单';
  }

}
