import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less']
})
export class ErrorComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this._router.navigate(['']);
    }, 3000);
  }

}
