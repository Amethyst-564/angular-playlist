import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


const model = {
  loginStatus: false,
  username: '',
};

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  public model: any;

  public static login(username: string) {
    model.loginStatus = true;
    model.username = username;
  }

  constructor(
    private _router: Router,
  ) { this.model = model; }

  ngOnInit() {
  }

  onClick() {
    this._router.navigate(['/login']);
  }

  logout() {
    model.loginStatus = false;
    model.username = '';
  }

}
