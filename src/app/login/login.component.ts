import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
// 响应式表单
import { FormGroup, FormControl } from '@angular/forms';
// 表单验证器
import { Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  model = new User('', '');


  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login(username: string, password: string) {
    this.loginService.login(username, password);
  }

}
