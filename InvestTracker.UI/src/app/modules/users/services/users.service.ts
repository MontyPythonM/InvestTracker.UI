import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { apiUrl } from '../../../shared/environments/api-urls';
import { HTTP_OPTIONS } from '../../../core/constants';
import { UserDetails } from '../models/user-details.model';
import { SystemRole } from '../../../core/enums/system-role.enum';
import { SystemSubscription } from '../../../core/enums/system-subscription.enum';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpClient = inject(HttpClient);

  getUserDetails(id: string) : Observable<HttpResponse<UserDetails>> {
    let requestOptions = Object.assign({}, HTTP_OPTIONS);
    return this.httpClient.get<HttpResponse<UserDetails>>(`${apiUrl.module.users}/users/${id}/details`, requestOptions);
  }

  getUsers() : Observable<HttpResponse<User[]>> {
    let requestOptions = Object.assign({}, HTTP_OPTIONS);
    return this.httpClient.get<HttpResponse<User[]>>(`${apiUrl.module.users}/users/all`, requestOptions);
  }

  setRole(userId: string, role: SystemRole) : Observable<HttpResponse<void>> {
    let requestOptions = Object.assign({}, HTTP_OPTIONS);
    return this.httpClient.patch<HttpResponse<void>>(`${apiUrl.module.users}/users/${userId}/set-role`, { role }, requestOptions);
  }

  removeRole(userId: string) : Observable<HttpResponse<void>>  {
    let requestOptions = Object.assign({}, HTTP_OPTIONS);
    return this.httpClient.patch<HttpResponse<void>>(`${apiUrl.module.users}/users/${userId}/remove-role`, {}, requestOptions);
  }

  setSubscription(userId: string, subscription: SystemSubscription, expiredAt?: Date | undefined) : Observable<HttpResponse<void>>  {
    let requestOptions = Object.assign({}, HTTP_OPTIONS);
    return this.httpClient.patch<HttpResponse<void>>(`${apiUrl.module.users}/users/${userId}/set-subscription`, { subscription, expiredAt }, requestOptions);
  }

  activate(userId: string) : Observable<HttpResponse<void>>  {
    let requestOptions = Object.assign({}, HTTP_OPTIONS);
    return this.httpClient.patch<HttpResponse<void>>(`${apiUrl.module.users}/users/${userId}/activate`, {}, requestOptions);
  }

  deactivate(userId: string) : Observable<HttpResponse<void>>  {
    let requestOptions = Object.assign({}, HTTP_OPTIONS);
    return this.httpClient.patch<HttpResponse<void>>(`${apiUrl.module.users}/users/${userId}/deactivate`, {}, requestOptions);
  }
}
