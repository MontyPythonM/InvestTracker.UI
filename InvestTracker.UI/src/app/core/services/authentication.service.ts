import { Injectable, inject } from '@angular/core';
import { ACCESS_TOKEN_KEY } from '../constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Jwt } from '../models/jwt.model';
import { Observable } from 'rxjs';
import { AccessToken } from '../models/access-token.model';
import { apiUrl } from '../../shared/environments/api-urls';
import { HttpService } from '../../shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private httpService = inject(HttpService);

  getToken() : string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getDecodedToken() : Jwt | null  {
    return new JwtHelperService().decodeToken(this.getToken()!);
  }

  hasValidToken() : boolean {
    const token = this.getToken();
    if (!token || new JwtHelperService().isTokenExpired(token)) {
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

  revokeToken(userId?: string) : Observable<void> {
    return this.httpService.post<void>(`${apiUrl.module.users}/accounts/revoke-token/${userId ?? ''}`);
  }

  refreshToken() : Observable<AccessToken> {
    return this.httpService.post<AccessToken>(`${apiUrl.module.users}/accounts/refresh-token`);
  }
}
