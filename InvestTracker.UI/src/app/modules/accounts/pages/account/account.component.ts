import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../shared/abstractions/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyField } from '../../../../shared/models/property-field.model';
import { DateTimeService } from '../../../../shared/services/date-time.service';
import { AdvisorsService } from '../../../../core/services/advisors.service';
import { AdvisorDetails } from '../../../../core/models/advisor-details.model';
import { SystemSubscription } from '../../../../core/enums/system-subscription.enum';
import { UpdateAdvisorComponent } from '../../../../core/components/update-advisor/update-advisor.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateAdvisor } from '../../../../core/models/update-advisor.model';
import { of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent extends BaseComponent implements OnInit {
  private accountService = inject(AccountService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private dateTimeService = inject(DateTimeService);
  private advisorsService = inject(AdvisorsService);
  private dialog = inject(MatDialog);
  user?: User;
  deleteAccountForm: FormGroup;
  accountFields: PropertyField[] = [];
  advisorFields: PropertyField[] = [];
  advisor?: AdvisorDetails;

  constructor() {
    super();
    this.deleteAccountForm = this.formBuilder.group({
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  deleteAccount() {
    if (this.deleteAccountForm.invalid) {
      return;
    }
    this.accountService.deleteAccount(this.password.value).safeSubscribe(this, {
      next: () => {
        this.authenticationService.clearToken();
        this.router.navigateByUrl('/home');
      }
    });
  }

  updateAdvisor() {


    // todo open dialog
  }

  openUpdateAdvisorDialog() {
    if (this.user?.subscription !== SystemSubscription.Advisor) {
      return;
    }

    const dialog = this.dialog.open(UpdateAdvisorComponent, {
      data: { model: this.advisor }
    });

    let isAdvisorDataChanged: boolean = false;
    let advisorId: string | undefined;

    dialog.afterClosed().pipe(tap((data: UpdateAdvisor) => {
      isAdvisorDataChanged = data !== undefined;
      advisorId = data?.id;
    }), switchMap((data: UpdateAdvisor) => {
      if (data) {
        return this.advisorsService.upadte(data);
      }
      return of(null);
    })).safeSubscribe(this, {
      next: () => {
        if (isAdvisorDataChanged) {
          this.notifyService.show('Advisor profile updated');
          this.getAdvisor(advisorId!);
        }
      }
    });
  }

  private getUser() {
    this.accountService.getCurrentUser().safeSubscribe(this, {
      next: (response: User) => {
        this.user = response;
        this.setUserFields(response);

        if (this.user.subscription === SystemSubscription.Advisor) {
          this.getAdvisor(this.user.id);
        }
      }
    });
  }

  private getAdvisor(advisorId: string) {
    this.advisorsService.get(advisorId).safeSubscribe(this, {
      next: (result) => {
        this.advisor = result;
        this.setAdvisorFields(result);
      }
    });
  }

  private setUserFields(user: User) {
    this.accountFields = [
      { name: 'ID', value: user.id },
      { name: 'Full name', value: user.fullName },
      { name: 'Email', value: user.email },
      { name: 'Phone', value: user.phone },
      { name: 'Role', value: user.role },
      { name: 'Subscription', value: user.subscription },
      { name: 'Active', value: user.isActive ? "Yes" : "No" },
      { name: 'Created at', value: this.dateTimeService.formatDateTime(user.createdAt) },
    ];
  }

  private setAdvisorFields(advisor: AdvisorDetails) {
    this.advisorFields = [
      { name: 'Full name', value: advisor.fullName },
      { name: 'Email', value: advisor.email },
      { name: 'Phone', value: advisor.phoneNumber },
      { name: 'Biography', value: advisor.bio },
      { name: 'Company', value: advisor.companyName },
    ];
  }

  protected get password() {
    return this.deleteAccountForm.get('password')!;
  }
}
