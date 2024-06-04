import { Injectable } from '@angular/core';
import { ACCESS_TOKEN_KEY } from '../constants';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Jwt } from '../models/jwt.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  hasValidToken() : boolean {
    const token = this.getToken();
    if (!token || new JwtHelperService().isTokenExpired(token)) {
      this.clearToken();
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
}
