import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { AccountService } from '../../services/account.service';
import { DATETIME_FORMAT } from '../../../../core/constants';
import { NotifyService } from '../../../../shared/services/notify.service';
import { ErrorResponse } from '../../../../shared/modules/error-response.model';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { BaseComponent } from '../../../../shared/abstractions/base.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent extends BaseComponent implements OnInit {
  user?: User;
  dateTimeFormat = DATETIME_FORMAT;
  accountService = inject(AccountService);
  router = inject(Router);

  ngOnInit(): void {
    this.accountService.getUser().safeSubscribe(this, {
      next: (response) => {
        this.user = response.body as User;
      }
    });
  }

  openDeleteAccountDialog() {
    // TODO add dialog with string input field for password and cancel/confirm buttons
    this.deleteAccount("");
  }

  private deleteAccount(password: string) {
    this.accountService.deleteAccount(password).safeSubscribe(this, {
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
}