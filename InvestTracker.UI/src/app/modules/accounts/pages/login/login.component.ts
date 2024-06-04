import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { LoginForm } from '../../models/login-form.model';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { AccessToken } from '../../../../core/models/access-token.model';
import { Router } from '@angular/router';
import { NotifyService } from '../../../../shared/services/notify.service';
import { ErrorResponse } from '../../../../shared/modules/error-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  accountService = inject(AccountService);
  authenticationService = inject(AuthenticationService);
  router = inject(Router);
  notifyService = inject(NotifyService);
  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginFormModel = new LoginForm(this.email!.value, this.password.value);
    this.accountService.login(loginFormModel).subscribe((data) => {
      let accessToken = data.body as AccessToken;
      this.authenticationService.setToken(accessToken.token);
      this.router.navigateByUrl('/');
      this.notifyService.show("Successfully logged in", "Ok");
    });

    this.accountService.login(loginFormModel).subscribe({
      next: (data) => {
        let accessToken = data.body as AccessToken;
        this.authenticationService.setToken(accessToken.token);
        this.router.navigateByUrl('/');
        this.notifyService.show("Successfully logged in");
      },
      error: (error) => {
        let errors = error.error as ErrorResponse;
        this.notifyService.show(`${errors.errors[0].exceptionMessage}`);
      }
    });
  }

  protected get email() {
    return this.loginForm.get('email');
  }

  protected get password() {
    return this.loginForm.get('password')!;
  }
}
