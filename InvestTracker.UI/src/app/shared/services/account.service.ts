import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginForm } from '../models/LoginForm';

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

  constructor(private httpClient: HttpClient) {
  }

  login(email: string, password: string): Observable<HttpResponse<string>> {
    let requestOptions = Object.assign({}, httpOptions);
    Object.assign(requestOptions);
    requestOptions.body = new LoginForm(email, password);

    return this.httpClient.request<HttpResponse<string>>("POST", "http://localhost:5200/users-module/accounts/sign-in", requestOptions);
  }
}