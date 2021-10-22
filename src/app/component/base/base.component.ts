import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { SidenavService } from 'src/app/service/sidenav/sidenav.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';
  // Sidebar
  //new BehaviorSubject<boolean>(true); // Behavior subject passed to the navbar component, so it can emit new values
  isSidenavOpen: boolean; // Value used to determine whether the sidenav has to be open.
  constructor(
    private authService: AuthService,
    private sidenavService: SidenavService
  ) {
    this.isSidenavOpen = this.sidenavService.getIsSidenavOpen();
    this.username = this.authService.getUsername();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    // 1. Subscribe the value to the behavior subject.
    // We are getting the event emitter defined in the auth service to know if the sidebar is open and if we are logged in.
    this.sidenavService.isSidenavOpen.subscribe(() => {
      this.isSidenavOpen = this.sidenavService.getIsSidenavOpen();
    });
    this.authService.username.subscribe(() => {
      this.username = this.authService.getUsername();
    });
    this.authService.loggedIn.subscribe(() => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }
}
