import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterForm } from '../models/register-form.model';
import { LoginForm } from '../models/login-form.model';
import { User } from '../../../core/models/user.model';
import { AccessToken } from '../../../core/models/access-token.model';
import { httpOptions } from '../../../core/constants';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  httpClient = inject(HttpClient);

  login(loginForm: LoginForm) : Observable<HttpResponse<AccessToken>> {
    let requestOptions = Object.assign({}, httpOptions);
    return this.httpClient.post<HttpResponse<AccessToken>>("http://localhost:5200/users-module/accounts/sign-in", loginForm, requestOptions);
  }

  register(registerForm: RegisterForm) : Observable<HttpResponse<void>> {
    let requestOptions = Object.assign({}, httpOptions);
    return this.httpClient.post<HttpResponse<void>>("http://localhost:5200/users-module/accounts/sign-up", registerForm, requestOptions);
  }

  getUser() : Observable<HttpResponse<User>> {
    let requestOptions = Object.assign({}, httpOptions);
    return this.httpClient.get<HttpResponse<User>>("http://localhost:5200/users-module/users", requestOptions);
  }

  deleteAccount(password: string) : Observable<ArrayBuffer> {
    let requestOptions = Object.assign({}, httpOptions);
    requestOptions.body = { password: password };
    return this.httpClient.delete<ArrayBuffer>("http://localhost:5200/users-module/accounts/", requestOptions);
  }
}