import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  authenticationService = inject(AuthenticationService);

  intercept = (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> =>
    this.authenticationService.hasValidToken() ?
      next.handle(request.clone({ setHeaders: { 'Authorization': 'Bearer ' + this.authenticationService.getToken() }})) :
      next.handle(request);
}
