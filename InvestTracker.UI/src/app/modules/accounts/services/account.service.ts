import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterForm } from '../models/register-form.model';
import { LoginForm } from '../models/login-form.model';
import { User } from '../../../core/models/user.model';
import { AccessToken } from '../../../core/models/access-token.model';
import { HTTP_OPTIONS } from '../../../core/constants';
import { apiUrl } from '../../../shared/environments/api-urls';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  httpClient = inject(HttpClient);

  login(loginForm: LoginForm) : Observable<HttpResponse<AccessToken>> {
    let requestOptions = Object.assign({}, HTTP_OPTIONS);
    return this.httpClient.post<HttpResponse<AccessToken>>(`${apiUrl.module.users}/accounts/sign-in`, loginForm, requestOptions);
  }

  register(registerForm: RegisterForm) : Observable<HttpResponse<void>> {
    let requestOptions = Object.assign({}, HTTP_OPTIONS);
    return this.httpClient.post<HttpResponse<void>>(`${apiUrl.module.users}/accounts/sign-up`, registerForm, requestOptions);
  }

  getUser() : Observable<HttpResponse<User>> {
    let requestOptions = Object.assign({}, HTTP_OPTIONS);
    return this.httpClient.get<HttpResponse<User>>(`${apiUrl.module.users}/users`, requestOptions);
  }

  deleteAccount(password: string) : Observable<ArrayBuffer> {
    let requestOptions = Object.assign({}, HTTP_OPTIONS);
    requestOptions.body = { password: password };
    return this.httpClient.delete<ArrayBuffer>(`${apiUrl.module.users}/accounts/`, requestOptions);
  }
}