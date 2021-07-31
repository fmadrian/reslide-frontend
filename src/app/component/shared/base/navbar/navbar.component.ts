import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() isSidenavOpen = new BehaviorSubject<boolean>(false);
  constructor() { 
  }

  ngOnInit(): void {
  }

  switchSidenav(){
    this.isSidenavOpen.next(!this.isSidenavOpen.value); // IMPORTANT: Use next instead of init to submit new values.
  }
}
