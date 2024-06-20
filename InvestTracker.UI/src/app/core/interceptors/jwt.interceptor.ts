import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NotifyService } from '../../shared/services/notify.service';
import { ErrorResponse } from '../../shared/models/error-response.model';
import { AccessToken } from '../models/access-token.model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  authenticationService = inject(AuthenticationService);
  router = inject(Router);
  notifyService = inject(NotifyService);

  intercept = (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    if (this.authenticationService.hasValidToken()) {
      return next.handle(request.clone({ setHeaders: { 'Authorization': 'Bearer ' + this.authenticationService.getToken() }}))
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && !request.url.includes('accounts/sign-in') && error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (this.authenticationService.isTokenExists()) {
      return this.authenticationService.refreshToken().pipe(
        switchMap((response: AccessToken) => {
          if (response?.token) {
            this.authenticationService.setToken(response?.token);
          }
          return next.handle(request.clone({ setHeaders: { 'Authorization': 'Bearer ' + this.authenticationService.getToken() }}))
        }),
        catchError((error) => {
          if (error.status === 400) {
            this.authenticationService.clearToken();
            this.router.navigateByUrl('/');
            let errors = error.error as ErrorResponse;
            this.notifyService.show(`${errors.errors[0].exceptionMessage}`);
          }
          return throwError(() => error);
        })
      );
    }
    return next.handle(request);
  }
}
