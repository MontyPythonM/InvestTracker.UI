import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../shared/abstractions/base.component';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { UserDetails } from '../../models/user-details.model';
import { PropertyField } from '../../../../shared/models/property-field.model';
import { subscriptionChangeSourceObjects } from '../../enums/change-source.enum';
import { MatDialog } from '@angular/material/dialog';
import { DateTimeService } from '../../../../shared/services/date-time.service';
import { SetSubscriptionComponent } from '../../components/set-subscription/set-subscription.component';
import { SetRoleComponent } from '../../components/set-role/set-role.component';

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
  usersService = inject(UsersService);
  route = inject(ActivatedRoute);
  dialog = inject(MatDialog);
  dateTimeService = inject(DateTimeService);

  constructor() {
    super();
    this.userId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getUserDetails();
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

  openSetSubscriptionDialog() {
    this.dialog.open(SetSubscriptionComponent);
  }

  openSetRoleDialog() {
    this.dialog.open(SetRoleComponent);
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
      { name: 'Change source', value: `${subscriptionChangeSourceObjects.find(x => x.index == this.user?.subscription.changeSource)?.value}` },
      { name: 'Granted by', value: `${user.subscription.grantedBy}` },
      { name: 'Granted at', value: this.dateTimeService.formatDateTime(user.subscription.grantedAt) },
    ];
  }
}
