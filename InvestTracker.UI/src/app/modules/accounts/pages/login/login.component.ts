import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { LoginForm } from '../../models/login-form.model';
import { AccessToken } from '../../../../core/models/access-token.model';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../shared/abstractions/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent {
  formBuilder = inject(FormBuilder);
  accountService = inject(AccountService);
  router = inject(Router);
  loginForm: FormGroup;

  constructor() {
    super();
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

    this.accountService.login(loginFormModel).safeSubscribe(this, {
      next: (response: AccessToken) => {
        this.authenticationService.setToken(response.token);
        this.router.navigateByUrl('/');
        this.notifyService.show("Successfully logged in");
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
