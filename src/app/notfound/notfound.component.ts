import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.less']
})
export class NotfoundComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this._router.navigate(['']);
    }, 3000);
  }

}
