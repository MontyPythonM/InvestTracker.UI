import { Injectable } from '@angular/core';
import { ACCESS_TOKEN_KEY } from '../constants';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Jwt } from '../models/jwt.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedSource = new BehaviorSubject<boolean>(false);
  public isLogged$ = this.isLoggedSource.asObservable();

  hasValidToken() : boolean {
    const token = this.getToken();

    if (!!token && new JwtHelperService().isTokenExpired(token)) {
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
    this.isLoggedSource.next(true);
  }

  clearToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.isLoggedSource.next(false);
  }
}
