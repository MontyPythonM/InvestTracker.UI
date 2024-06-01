import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterForm } from '../models/register-form.model';
import { LoginForm } from '../models/login-form.model';

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  body: {},
  observe: 'response' as 'body',
  params: {},
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) {}

  login(loginForm: LoginForm) : Observable<HttpResponse<string>> {
    let requestOptions = Object.assign({}, httpOptions);
    Object.assign(requestOptions);
    requestOptions.body = loginForm;

    return this.httpClient.request<HttpResponse<string>>("POST", "http://localhost:5200/users-module/accounts/sign-in", requestOptions);
  }

  register(registerForm: RegisterForm) : Observable<HttpResponse<string>>{
    let requestOptions = Object.assign({}, httpOptions);
    Object.assign(requestOptions);
    requestOptions.body = registerForm;

    return this.httpClient.request<HttpResponse<string>>("POST", "http://localhost:5200/users-module/accounts/sign-up", requestOptions);
  }
}