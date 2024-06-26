import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { apiUrl } from '../../../shared/environments/api-urls';
import { UserDetails } from '../models/user-details.model';
import { SystemRole } from '../../../core/enums/system-role.enum';
import { SystemSubscription } from '../../../core/enums/system-subscription.enum';
import { HttpService } from '../../../shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private httpService = inject(HttpService);

  getUserDetails(id: string) : Observable<UserDetails> {
    return this.httpService.get<UserDetails>(`${apiUrl.module.users}/users/${id}`);
  }

  getUsers() : Observable<User[]> {
    return this.httpService.get<User[]>(`${apiUrl.module.users}/users`);
  }

  setRole(userId: string, role: SystemRole) : Observable<void> {
    return this.httpService.patch<void>(`${apiUrl.module.users}/users/${userId}/set-role`, { role });
  }

  setSubscription(userId: string, subscription: SystemSubscription, expiredAt: Date | undefined) : Observable<void>  {
    return this.httpService.patch<void>(`${apiUrl.module.users}/users/${userId}/set-subscription`, { subscription, expiredAt });
  }

  activate(userId: string) : Observable<void>  {
    return this.httpService.patch<void>(`${apiUrl.module.users}/users/${userId}/activate`);
  }

  deactivate(userId: string) : Observable<void> {
    return this.httpService.patch<void>(`${apiUrl.module.users}/users/${userId}/deactivate`);
  }
}
