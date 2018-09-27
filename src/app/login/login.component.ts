import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
// 响应式表单
import { FormGroup, FormControl } from '@angular/forms';
// 表单验证器
import { Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';

const regex = /^[a-zA-Z0-9_]+$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  model = new User('', '');

  username = new FormControl('', [Validators.required, Validators.pattern(regex), Validators.minLength(4), Validators.maxLength(16)]);
  password = new FormControl('', [Validators.required]);

  constructor(private loginService: LoginService, private _router: Router) { }

  ngOnInit() {
  }

  login(username: string, password: string) {
    this.loginService.login(username, password).subscribe(data => {
      const code = data.code;
      if (code === 0) {
        this._router.navigate(['search']);
      } else {
        console.log(code, data.msg);
      }
    });
  }

}
