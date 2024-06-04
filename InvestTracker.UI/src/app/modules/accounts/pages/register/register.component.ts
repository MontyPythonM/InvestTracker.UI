import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { RegisterForm } from '../../models/register-form.model';
import { PHONE_REGEX } from '../../../../core/constants';
import { NotifyService } from '../../../../shared/services/notify.service';
import { ErrorResponse } from '../../../../shared/modules/error-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  formBuilder = inject(FormBuilder);
  accountService = inject(AccountService);
  notifyService = inject(NotifyService);
  router = inject(Router);
  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      fullname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(PHONE_REGEX)]],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const registerFormModel = new RegisterForm(this.email!.value, this.password.value, this.fullname?.value, this.phone.value);
    this.accountService.register(registerFormModel).subscribe({
      next: () => {
        this.router.navigateByUrl('/account/login');
        this.notifyService.show("Successfully registered");
      },
      error: (error) => {
        let errors = error.error as ErrorResponse;
        this.notifyService.show(`${errors.errors[0].exceptionMessage}`);
      }
    });
  }

  protected get email() {
    return this.registerForm.get('email');
  }

  protected get password() {
    return this.registerForm.get('password')!;
  }

  protected get fullname() {
    return this.registerForm.get('fullname');
  }

  protected get phone() {
    return this.registerForm.get('phone')!;
  }
}
