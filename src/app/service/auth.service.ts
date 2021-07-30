import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequest } from '../payload/auth/login/login.request';
import { ApiRoutes } from '../utils/apiRoutes';
import { catchError, map,tap } from 'rxjs/operators';
import {LoginResponse} from '../payload/auth/login/login.response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private localStorage : LocalStorageService, 
    private router : Router) { }
  // Observables need to be observed to trigger a request.
  login(loginRequest : LoginRequest){
    return this.httpClient.post<LoginResponse>(ApiRoutes.auth.login, loginRequest)
    .pipe(
      map(data=>{
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);      
        return true;
      })
    );
  }

  refreshToken(){
    const refreshTokenRequest = {
      username : this.localStorage.retrieve('username'),
      refreshToken : this.localStorage.retrieve('refreshToken')
    }
    return this.httpClient.post<LoginResponse>(ApiRoutes.auth.refreshToken, refreshTokenRequest)
    .pipe(tap(response => {
      // Clear the information of the previous token.
      this.localStorage.clear('authenticationToken');
      this.localStorage.clear('expiresAt');
      // Store the new information into the local storage
      this.localStorage.store('authenticationToken',
        response.authenticationToken);
      this.localStorage.store('expiresAt', response.expiresAt);
    }));
  }

  getJwtToken() : string{
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(){
    return false;
  }

}
