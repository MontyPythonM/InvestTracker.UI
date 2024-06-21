import { Component, inject } from '@angular/core';
import { BaseComponent } from '../../../../shared/abstractions/base.component';
import { AccountService } from '../../services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent extends BaseComponent {
  formBuilder = inject(FormBuilder);
  accountService = inject(AccountService);
  forgotPasswordForm: FormGroup;
  emailSent: boolean;

  constructor() {
    super();
    this.emailSent = false;
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.accountService.forgotPassword(this.email?.value).safeSubscribe(this, {
      next: () => {
        this.emailSent = true;
        this.notifyService.show("Email was sent with a link to reset your password. Check your inbox");
      }
    });
  }

  protected get email() {
    return this.forgotPasswordForm.get('email');
  }
}
