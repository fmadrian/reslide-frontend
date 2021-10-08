import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() isSidenavOpen = new BehaviorSubject<boolean>(false);
  @Input() username = '';
  @Input() isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  switchSidenav() {
    this.isSidenavOpen.next(!this.isSidenavOpen.value); // IMPORTANT: Use next instead of init to submit new values.
  }
  logout() {
    of(this.authService.logout())
      .toPromise()
      .then((logoutResult) => {
        if (logoutResult) {
          this.router.navigateByUrl(AppRoutes.login);
        }
      });
  }
}
