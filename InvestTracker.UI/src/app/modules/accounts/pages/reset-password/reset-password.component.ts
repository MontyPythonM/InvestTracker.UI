import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../../shared/abstractions/base.component';
import { ResetPasswordForm } from '../../models/reset-password-form.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent extends BaseComponent {
  formBuilder = inject(FormBuilder);
  accountService = inject(AccountService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  resetPasswordForm: FormGroup;
  private key: string;

  constructor() {
    super();
    this.key = this.route.snapshot.params['key'];
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  public onSubmit() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    const resetPasswordModel = new ResetPasswordForm(this.key, this.password.value, this.confirmPassword.value);

    this.accountService.resetPassword(resetPasswordModel).safeSubscribe(this, {
      next: () => {
        this.router.navigateByUrl('/');
        this.notifyService.show("New password has been saved");
      },
      error: (error) => {
        this.notifyService.showError(error);
      }
    });
  }

  protected get password() {
    return this.resetPasswordForm.get('password')!;
  }

  protected get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword')!;
  }
}
