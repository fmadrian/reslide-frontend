import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';
  // Sidebar
  @Output() isSidenavOpen$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true); // Behavior subject passed to the navbar component, so it can emit new values
  isSidenavOpen: boolean; // Value used to determine whether the sidenav has to be open.
  constructor(private authService: AuthService) {
    this.isSidenavOpen = false;
    this.username = this.authService.getUsername();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    // 1. Subscribe the value to the behavior subject.
    // We are getting the event emitter defined in the auth service to know if the sidebar is open and if we are logged in.
    this.isSidenavOpen$.subscribe((data) => {
      this.isSidenavOpen = data;
    });
    this.authService.username.subscribe((data) => {
      this.username = this.authService.getUsername();
    });
    this.authService.loggedIn.subscribe((data) => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }
}
