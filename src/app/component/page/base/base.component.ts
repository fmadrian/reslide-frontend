import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  isLoggedIn : boolean;
  // Sidebar
  @Output() isSidenavOpen$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true); // Behavior subject passed to the navbar component, so it can emit new values
  isSidenavOpen : boolean;  // Value used to determine whether the sidenav has to be open. 
  constructor(private authService: AuthService) { 
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isSidenavOpen = false;
  }

  ngOnInit(): void {
    // 1. Subscribe the value to the behavior subject.
   this.isSidenavOpen$.subscribe(
     (data)=>{
      this.isSidenavOpen = data;
     }
   )
  }
  
}
