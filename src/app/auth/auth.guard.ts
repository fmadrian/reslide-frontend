import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { AppRoutes } from '../utils/appRoutes';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let routePath = route.routeConfig?.path;
    // Redirect to landing page, if you are logged in.
    // Otherwise, redirect to login
    if (this.authService.isLoggedIn()) {
      if (routePath !== null && routePath === AppRoutes.login) {
        this.router.navigateByUrl(AppRoutes.landing);
      }
    } else {
      if (routePath !== AppRoutes.login) {
        // Avoid endless cycle of redirections.
        this.router.navigateByUrl(AppRoutes.login);
      }
    }
    return true;
  }
}
