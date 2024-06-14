import { Injectable, inject } from '@angular/core';
import { ACCESS_TOKEN_KEY, httpOptions } from '../constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Jwt } from '../models/jwt.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, firstValueFrom, map, of, tap } from 'rxjs';
import { AccessToken } from '../models/access-token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  httpClient = inject(HttpClient);

  hasValidToken() : boolean {
    const token = this.getToken();
    if (!token || new JwtHelperService().isTokenExpired(token)) {
      // clear current jwt
      this.clearToken();

      // call backend refreshToken() for new AccessToken object

      // if response is success store new jwt and return true
      //this.setToken(response.body.token);

      // otherwise return false
      return false;
    }
    return true;
  }

  getToken() : string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getDecodedToken() : Jwt | null  {
    return this.hasValidToken() ? new JwtHelperService().decodeToken(this.getToken()!) : null;
  }

  setToken(jwt: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, jwt);
  }

  clearToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  revokeToken() : Observable<HttpResponse<void>> {
    let requestOptions = Object.assign({}, httpOptions);
    return this.httpClient.post<HttpResponse<void>>("http://localhost:5200/users-module/accounts/revoke-token", {}, requestOptions);
  }

  refreshToken() : Observable<HttpResponse<AccessToken>> {
    let requestOptions = Object.assign({}, httpOptions);
    return this.httpClient.post<HttpResponse<AccessToken>>("http://localhost:5200/users-module/accounts/refresh-token", {}, requestOptions)
  }
}
