import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  isLoggedIn : boolean;
  constructor() { 
    this.isLoggedIn = false; // TODO: Replace for actual is logged in.
  }

  ngOnInit(): void {
  }

}
