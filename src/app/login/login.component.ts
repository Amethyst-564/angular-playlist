import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// 响应式表单
import { FormGroup, FormControl } from '@angular/forms';
// 表单验证器
import { Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Result } from '../result';

const regex = /^[a-zA-Z0-9_]+$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  model = new Result(0, '');

  username = new FormControl('', {
    validators: [Validators.required, Validators.pattern(regex),
      Validators.minLength(4), Validators.maxLength(16)],
    updateOn: 'blur'
  });

  password = new FormControl('', {
    validators: [Validators.required],
    updateOn: 'blur'
  });

  constructor(private loginService: LoginService, private _router: Router) { }

  ngOnInit() {
  }

  login(username: string, password: string) {
    this.loginService.login(username, password).subscribe(data => {
      const code = data.code;
      if (code === 0) {
        this._router.navigate(['search']);
      } else {
        this.model.code = code;
        this.model.msg = data.msg;
      }
    });
  }

}
