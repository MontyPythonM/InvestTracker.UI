import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HTTP_OPTIONS } from '../../core/constants';

@Injectable({
  providedIn: 'root'
})
export abstract class HttpService {

  constructor(protected httpClient: HttpClient) { }

  post<T>(uri: string, body?: object, options?: {}) : Observable<T> {
    return this.sendRequest<T>('POST', uri, body, options)
      .pipe(map((response: HttpResponse<T>) => response.body as T))
  }

  put<T>(uri: string, body?: object, options?: {}) : Observable<T> {
    return this.sendRequest<T>('PUT', uri, body, options)
      .pipe(map((response: HttpResponse<T>) => response.body as T))
  }

  patch<T>(uri: string, body?: object, options?: {}) : Observable<T> {
    return this.sendRequest<T>('PATCH', uri, body, options)
      .pipe(map((response: HttpResponse<T>) => response.body as T))
  }

  delete<T>(uri: string, body?: object, options?: {}) : Observable<T> {
    return this.sendRequest<T>('DELETE', uri, body, options)
      .pipe(map((response: HttpResponse<T>) => response.body as T))
  }

  get<T>(uri: string, body?: object, options?: {}) : Observable<T> {
    return this.sendRequest<T>('GET', uri, body, options)
      .pipe(map((response: HttpResponse<T>) => response.body as T))
  }

  private sendRequest<T>(method: string, uri: string, body?: object, options?: {}) : Observable<HttpResponse<T>> {
    const requestOptions = Object.assign({}, HTTP_OPTIONS);
    Object.assign(requestOptions, options);
    requestOptions.body = body ?? {};
    return this.httpClient.request<HttpResponse<T>>(method, uri, requestOptions);
  }
}
