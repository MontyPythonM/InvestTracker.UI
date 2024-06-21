import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { AccountService } from '../../services/account.service';
import { ErrorResponse } from '../../../../shared/models/error-response.model';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../shared/abstractions/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyField } from '../../../../shared/models/property-field.model';
import { DateTimeService } from '../../../../shared/services/date-time.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent extends BaseComponent implements OnInit {
  user?: User;
  deleteAccountForm: FormGroup;
  accountFields: PropertyField[] = [];
  accountService = inject(AccountService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  dateTimeService = inject(DateTimeService);

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
          { name: 'Role', value: this.user.role },
          { name: 'Subscription', value: this.user.subscription },
          { name: 'Active', value: this.user.isActive ? "Yes" : "No" },
          { name: 'Created at', value: this.dateTimeService.formatDateTime(this.user.createdAt) },
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
      }
    });
  }

  protected get password() {
    return this.deleteAccountForm.get('password')!;
  }
}