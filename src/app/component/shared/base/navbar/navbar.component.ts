import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { SidenavService } from 'src/app/service/sidenav/sidenav.service';
import { AppRoutes } from 'src/app/utils/appRoutes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() username = '';
  @Input() isLoggedIn = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private sidenavService: SidenavService
  ) {}

  ngOnInit(): void {}

  switchSidenav() {
    this.sidenavService.switchSidenav();
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
