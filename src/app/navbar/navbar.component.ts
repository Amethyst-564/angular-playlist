import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  login() {
    this._router.navigate(['/login']);
  }

  logout() {
    localStorage.removeItem('loginInfo');
  }

  get userInfo(): any {
    return JSON.parse(localStorage.getItem('loginInfo'));
  }
}
