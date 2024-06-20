import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterForm } from '../models/register-form.model';
import { LoginForm } from '../models/login-form.model';
import { User } from '../../../core/models/user.model';
import { AccessToken } from '../../../core/models/access-token.model';
import { apiUrl } from '../../../shared/environments/api-urls';
import { ResetPasswordForm } from '../models/reset-password-form.model';
import { HttpService } from '../../../shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  httpService = inject(HttpService);

  login(loginForm: LoginForm) : Observable<AccessToken> {
    return this.httpService.post<AccessToken>(`${apiUrl.module.users}/accounts/sign-in`, loginForm);
  }

  register(registerForm: RegisterForm) : Observable<void> {
    return this.httpService.post<void>(`${apiUrl.module.users}/accounts/sign-up`, registerForm);
  }

  getCurrentUser() : Observable<User> {
    return this.httpService.get<User>(`${apiUrl.module.users}/users/current`);
  }

  deleteAccount(password: string) : Observable<void> {
    return this.httpService.delete<void>(`${apiUrl.module.users}/accounts/`, { password: password });
  }

  forgotPassword(email: string) : Observable<void> {
    return this.httpService.post<void>(`${apiUrl.module.users}/accounts/forgot-password?email=${email}`);
  }

  resetPassword(reserPasswordForm: ResetPasswordForm) : Observable<void> {
    return this.httpService.post<void>(`${apiUrl.module.users}/accounts/reset-forgotten-password`, reserPasswordForm);
  }
}