import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequest } from '../payload/auth/login/login.request';
import { ApiRoutes } from '../utils/apiRoutes';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginResponse } from '../payload/auth/login/login.response';
import { BehaviorSubject, interval, Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserPayload } from '../payload/user/user.payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() loggedIn = new EventEmitter<boolean>();
  @Output() username = new EventEmitter<string>();
  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  // Observables need to be observed to trigger a request.
  login(loginRequest: LoginRequest) {
    return this.httpClient
      .post<LoginResponse>(ApiRoutes.auth.login, loginRequest)
      .pipe(
        map((data) => {
          this.localStorage.store(
            'authenticationToken',
            data.authenticationToken
          );
          this.localStorage.store('username', data.username);
          this.localStorage.store('refreshToken', data.refreshToken);
          this.localStorage.store('expiresAt', data.expiresAt);

          this.username.next(data.username);
          this.loggedIn.next(true);

          return true;
        })
      );
  }
  logout() {
    const logoutPayload = {
      refreshToken: this.getRefreshToken(),
    };
    // Chain 2 observables.
    // 1st observable: POST request. 2nd observable: The one defined as anonymous function inside the switchMap
    // Logout, then clear the storage.
    return this.httpClient.post(ApiRoutes.auth.logout, logoutPayload).pipe(
      switchMap(() => {
        // When a response is received, it cleans the storage
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('refreshToken');
        this.localStorage.clear('username');
        this.localStorage.clear('expiresAt');
        this.localStorage.clear('isSidenavOpen');

        // Trigger the event emitters and pass the information to other components.
        this.username.next('');
        this.loggedIn.next(false);
        return of(true); // Returns an Observable<boolean>
      })
    );
  }

  refreshToken() {
    const refreshTokenRequest = {
      username: this.localStorage.retrieve('username'),
      refreshToken: this.localStorage.retrieve('refreshToken'),
    };
    return this.httpClient
      .post<LoginResponse>(ApiRoutes.auth.refreshToken, refreshTokenRequest)
      .pipe(
        tap((response) => {
          // Clear the information of the previous token.
          this.localStorage.clear('authenticationToken');
          this.localStorage.clear('expiresAt');
          // Store the new information into the local storage
          this.localStorage.store(
            'authenticationToken',
            response.authenticationToken
          );
          this.localStorage.store('expiresAt', response.expiresAt);
        })
      );
  }
  getJwtToken(): string {
    return this.localStorage.retrieve('authenticationToken');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }
  getUsername() {
    const username = this.localStorage.retrieve('username');
    if (username) {
      return username;
    }
    return '';
    // return username !== null ? username : '';
  }
  isLoggedIn() {
    return this.getJwtToken() !== null;
  }
}
