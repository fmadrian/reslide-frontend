import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { catchError, switchMap, take, filter } from 'rxjs/operators';
import { LoginResponse } from '../payload/auth/login/login.response';
import { ApiRoutes } from '../utils/apiRoutes';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  isTokenRefreshing = false; // Block the ongoing calls
  // We use BehaviorSubject instead of Subject or a Observable.
  // Because BehaviorSubject can have a value assigned to it so when we receive the new token from the
  // refresh token method, we can assign the token to the BehaviorSubject and access the new token inside the interceptor (token-interceptor).
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(public authService: AuthService) {}
  // What TokenInterceptor has to do when it intercepts a request
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // If we are making an API call to refresh the token or to login (api/auth//login or .../api/auth/refresh),
    // we don't need an authorization token in the request.
    if (
      req.url.indexOf(ApiRoutes.auth.refreshToken) !== -1 ||
      req.url.indexOf(ApiRoutes.auth.login) !== -1
    ) {
      return next.handle(req).pipe(
        catchError((error) => {
          return this.handleHttpError(error);
        })
      );
    }
    // After this point, every request has to include the jwtToken.

    // 1. Retrieve the auth token.
    // 2. If the token is valid, we add it into the authorization headers.
    // 3. Clone the token and include the authorization header (this.addToken()).
    // 4. We use the cloned request (w/ authorization header included).
    const jwtToken = this.authService.getJwtToken();
    if (jwtToken) {
      // If the error, is an HTTP 403 "Forbidden" error we must request a refresh token.
      let interceptedRequest = this.addToken(req, jwtToken);
      return next.handle(interceptedRequest).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 403) {
            return this.handleAuthErrors(req, next);
          } else {
            return this.handleHttpError(error);
          }
        })
      );
    }
    // 5. If the request doesn't need a token, the request is returned without change.
    return next.handle(req);
  }

  // Adds the authentication token to the request.
  addToken(req: HttpRequest<any>, jwtToken: string) {
    // The request object is inmutable (we can't make changes in it)
    // We clone the request and add the authorization header
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${jwtToken}`),
    });
  }
  /**
   * Prepare our client to make the refresh token call to the backend
   * When we make this call, we have to block temporarily block all the
   * outgoing backends calls for this user.
   *
   * Once we receive a new authentication token from our backend we are going
   * to release all the requests again.
   *
   */
  private handleAuthErrors(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    // Blocks every incoming request when is asking for a new token.
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((refreshTokenResponse: LoginResponse) => {
          this.isTokenRefreshing = false; // If we don't turn off this variable, all outgoing requests will be blocked (HTTP 403)
          this.refreshTokenSubject.next(
            refreshTokenResponse.authenticationToken
          );
          return next.handle(
            this.addToken(req, refreshTokenResponse.authenticationToken)
          ); // Returns the intercepted request with the new authorization token included.
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        // If the token is refreshing, and we receive the non-response request
        // we will acesss the first result (take(1)), and switchMap to take the new
        // token and use it to make the request.
        filter((result) => result !== null),
        take(1),
        switchMap((res) => {
          return next.handle(
            this.addToken(req, this.authService.getJwtToken())
          );
        })
      );
    }
  }
  // Function that receives an http error and returns an error message.
  private handleHttpError(error: HttpErrorResponse) {
    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
      // Client side error.
      errorMsg = `Error: ${error.error.message}`;
    } else {
      // Server side error
      // The API returns an error object that includes (type and message) different from the client side error
      // so we can use it to return error messages in the client.
      errorMsg = `${error.error.message}`;
    }
    return throwError(errorMsg);
  }
}
