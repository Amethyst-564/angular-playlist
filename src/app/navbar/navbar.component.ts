import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistService } from '../service/playlist.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _router: Router,
    private _playlist: PlaylistService
  ) { }

  ngOnInit() {
  }

  login() {
    this._router.navigate(['login']);
  }

  logout() {
    localStorage.removeItem('loginInfo');
  }

  get userInfo(): any {
    return JSON.parse(localStorage.getItem('loginInfo'));
  }

}
