import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { AccountService } from '../../services/account.service';
import { DATETIME_FORMAT } from '../../../../core/constants';
import { ErrorResponse } from '../../../../shared/modules/error-response.model';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../shared/abstractions/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent extends BaseComponent implements OnInit {
  user?: User;
  dateTimeFormat = DATETIME_FORMAT;
  deleteAccountForm: FormGroup;
  accountService = inject(AccountService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);

  constructor() {
    super();
    this.deleteAccountForm = this.formBuilder.group({
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.accountService.getUser().safeSubscribe(this, {
      next: (response) => {
        this.user = response.body as User;
      }
    });
  }

  deleteAccount() {
    if (this.deleteAccountForm.invalid) {
      return;
    }

    this.accountService.deleteAccount(this.password.value).safeSubscribe(this, {
      next: () => {
        this.notifyService.show("Account has been permanently deleted");
        this.authenticationService.clearToken();
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        console.log(error);
        let errors = error.error as ErrorResponse;
        this.notifyService.show(`${errors.errors[0].exceptionMessage}`);
      }
    });
  }

  protected get password() {
    return this.deleteAccountForm.get('password')!;
  }
}