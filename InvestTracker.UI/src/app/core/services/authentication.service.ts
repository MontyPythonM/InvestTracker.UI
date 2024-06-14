import { Injectable, inject } from '@angular/core';
import { ACCESS_TOKEN_KEY, HTTP_OPTIONS } from '../constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Jwt } from '../models/jwt.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AccessToken } from '../models/access-token.model';
import { apiUrl } from '../../shared/environments/api-urls';
import { NotifyService } from '../../shared/services/notify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  httpClient = inject(HttpClient);
  notifyService = inject(NotifyService);

  getToken() : string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getDecodedToken() : Jwt | null  {
    // return this.hasValidToken() ? new JwtHelperService().decodeToken(this.getToken()!) : null;
    return new JwtHelperService().decodeToken(this.getToken()!);
  }

  hasValidToken() : boolean {
    const token = this.getToken();
    if (!token || new JwtHelperService().isTokenExpired(token)) {
      //this.clearToken();
      return false;
    }
    return true;
  }

  isTokenExpired() : boolean {
    return new JwtHelperService().isTokenExpired(this.getToken());
  }

  isTokenExists() : boolean {
    return !!this.getToken();
  }

  setToken(jwt: string) : void {
    localStorage.setItem(ACCESS_TOKEN_KEY, jwt);
  }

  clearToken() : void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  revokeToken() : Observable<HttpResponse<void>> {
    let requestOptions = Object.assign({}, HTTP_OPTIONS);
    return this.httpClient.post<HttpResponse<void>>(`${apiUrl.module.users}/accounts/revoke-token`, {}, requestOptions);
  }

  refreshToken() : Observable<HttpResponse<AccessToken>> {
    let requestOptions = Object.assign({}, HTTP_OPTIONS);
    return this.httpClient.post<HttpResponse<AccessToken>>(`${apiUrl.module.users}/accounts/refresh-token`, {}, requestOptions);
  }
}
