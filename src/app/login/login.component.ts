import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
// 响应式表单
import { FormGroup, FormControl } from '@angular/forms';
// 表单验证器
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  model = new User('', '');


  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit() {
  }

  login() {
    console.log('调用登陆api成功');
  }

}
