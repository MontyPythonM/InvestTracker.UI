import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { AccountService } from '../../services/account.service';
import { DATETIME_FORMAT } from '../../../../core/constants';
import { ErrorResponse } from '../../../../shared/models/error-response.model';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../shared/abstractions/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyField } from '../../../../shared/models/property-field.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent extends BaseComponent implements OnInit {
  user?: User;
  dateTimeFormat = DATETIME_FORMAT;
  deleteAccountForm: FormGroup;
  accountFields: PropertyField[] = [];
  accountService = inject(AccountService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  datePipe = inject(DatePipe);

  constructor() {
    super();
    this.deleteAccountForm = this.formBuilder.group({
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.accountService.getCurrentUser().safeSubscribe(this, {
      next: (response: User) => {
        this.user = response;
        this.accountFields = [
          { name: 'ID', value: this.user.id },
          { name: 'Full name', value: this.user.fullName },
          { name: 'Email', value: this.user.email },
          { name: 'Phone', value: this.user.phone },
          { name: 'Active', value: this.user.isActive ? "Yes" : "No" },
          { name: 'Created at', value: `${this.datePipe.transform(this.user.createdAt, DATETIME_FORMAT)}` },
        ];
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
      error: (error: ErrorResponse) => {
        this.notifyService.showError(error);
      }
    });
  }

  protected get password() {
    return this.deleteAccountForm.get('password')!;
  }
}