import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../shared/abstractions/base.component';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { UserDetails } from '../../models/user-details.model';
import { PropertyField } from '../../../../shared/models/property-field.model';
import { MatDialog } from '@angular/material/dialog';
import { DateTimeService } from '../../../../shared/services/date-time.service';
import { SetSubscriptionComponent } from '../../components/set-subscription/set-subscription.component';
import { SetRoleComponent } from '../../components/set-role/set-role.component';
import { Access } from '../../../../core/enums/access.enum';
import { enumToObjects } from '../../../../shared/converters/enum.converter';
import { SubscriptionChangeSource } from '../../enums/change-source.enum';
import { AccountService } from '../../../accounts/services/account.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent extends BaseComponent implements OnInit {
  user?: UserDetails;
  userId: string;
  accountFields: PropertyField[] = [];
  roleFields: PropertyField[] = [];
  subscriptionFields: PropertyField[] = [];
  isCurrentUserAccount: boolean;
  isSystemAdministrator: boolean;
  usersService = inject(UsersService);
  accountService = inject(AccountService);
  route = inject(ActivatedRoute);
  dialog = inject(MatDialog);
  dateTimeService = inject(DateTimeService);
  private subscriptionChangeSource = enumToObjects(SubscriptionChangeSource);

  constructor() {
    super();
    this.userId = this.route.snapshot.params['id'];
    this.isCurrentUserAccount = this.authenticationService.getDecodedToken()?.sub === this.userId;
    this.isSystemAdministrator = this.isAccessibleFor(Access.SystemAdministrators);
  }

  ngOnInit(): void {
    this.dialog.afterAllClosed.safeSubscribe(this, {
      next: () => this.getUserDetails()
    });
  }

  getUserDetails() {
    this.usersService.getUserDetails(this.userId).safeSubscribe(this, {
      next: (response: UserDetails) => {
        this.user = response;
        this.setFields(this.user);
      }
    });
  }

  block() {
    this.usersService.deactivate(this.userId).safeSubscribe(this, {
      next: () => {
        this.notifyService.show(`${this.user?.fullName} account deactivated`);
        this.getUserDetails();
      }
    })
  }

  unblock() {
    this.usersService.activate(this.userId).safeSubscribe(this, {
      next: () => {
        this.notifyService.show(`${this.user?.fullName} account activated`);
        this.getUserDetails();
      }
    })
  }

  revokeRefreshToken() {
    this.authenticationService.revokeToken(this.userId).safeSubscribe(this, {
      next: () => {
        this.notifyService.show('User refresh token revoked')
      }
    })
  }

  openSetSubscriptionDialog() {
    this.dialog.open(SetSubscriptionComponent, {
      data: { userId: this.userId, role: this.user?.role.value }
    });
  }

  openSetRoleDialog() {
    this.dialog.open(SetRoleComponent, {
      data: { userId: this.userId, role: this.user?.role.value }
    });
  }

  private setFields(user: UserDetails) {
    this.accountFields = [
      { name: 'ID', value: user.id },
      { name: 'Full name', value: user.fullName },
      { name: 'Email', value: user.email },
      { name: 'Phone', value: user.phone },
      { name: 'Active', value: user.isActive ? "Yes" : "No" },
      { name: 'Created at', value: this.dateTimeService.formatDateTime(user.createdAt) },
    ];
    this.roleFields = [
      { name: 'Role', value: user.role.value },
      { name: 'Granted by', value: `${user.role.grantedBy}` },
      { name: 'Granted at', value: this.dateTimeService.formatDateTime(user.role.grantedAt) },
    ];
    this.subscriptionFields = [
      { name: 'Subscription', value: user.subscription.value },
      { name: 'Expired at', value: this.dateTimeService.formatDateTime(user.subscription.expiredAt) },
      { name: 'Change source', value: `${this.subscriptionChangeSource.find(x => x.index == this.user?.subscription.changeSource)?.value}` },
      { name: 'Granted by', value: `${user.subscription.grantedBy}` },
      { name: 'Granted at', value: this.dateTimeService.formatDateTime(user.subscription.grantedAt) },
    ];
  }
}
