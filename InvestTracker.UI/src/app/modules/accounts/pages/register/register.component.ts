import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { RegisterForm } from '../../models/register-form.model';
import { PHONE_REGEX } from '../../../../core/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  formBuilder = inject(FormBuilder);
  accountService = inject(AccountService);
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
    this.accountService.register(registerFormModel).subscribe((data) => {
      console.log(data);
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
