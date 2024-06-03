import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
export abstract class HttpService {

  constructor(protected httpClient: HttpClient) { }

  protected post() {

  }

  protected put() {

  }

  protected patch() {

  }

  protected delete() {

  }

  protected get() {

  }


}
