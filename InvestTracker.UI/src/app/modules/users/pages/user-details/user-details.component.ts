import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../shared/abstractions/base.component';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { UserDetails } from '../../models/user-details.model';
import { PropertyField } from '../../../../shared/models/property-field.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DateTimeService } from '../../../../shared/services/date-time.service';
import { SetSubscriptionComponent } from '../../components/set-subscription/set-subscription.component';
import { SetRoleComponent } from '../../components/set-role/set-role.component';
import { Access } from '../../../../core/enums/access.enum';
import { enumToObjects } from '../../../../shared/converters/enum.converter';
import { SubscriptionChangeSource } from '../../enums/change-source.enum';
import { SystemRole } from '../../../../core/enums/system-role.enum';
import { SetSubscription } from '../../models/set-subscription.model';
import { of, switchMap, tap } from 'rxjs';

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
  setRoleDialog?: MatDialogRef<SetRoleComponent, any>;
  private usersService = inject(UsersService);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private dateTimeService = inject(DateTimeService);
  private subscriptionChangeSource = enumToObjects(SubscriptionChangeSource);

  constructor() {
    super();
    this.userId = this.route.snapshot.params['id'];
    this.isCurrentUserAccount = this.authenticationService.getDecodedToken()?.sub === this.userId;
    this.isSystemAdministrator = this.isAccessibleFor(Access.SystemAdministrators);
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

  blockUser() {
    this.usersService.deactivate(this.userId).safeSubscribe(this, {
      next: () => {
        this.notifyService.show(`${this.user?.fullName} account deactivated`);
        this.getUserDetails();
      }
    })
  }

  unblockUser() {
    this.usersService.activate(this.userId).safeSubscribe(this, {
      next: () => {
        this.notifyService.show(`${this.user?.fullName} account activated`);
        this.getUserDetails();
      }
    })
  }

  revokeUserRefreshToken() {
    this.authenticationService.revokeToken(this.userId).safeSubscribe(this, {
      next: () => {
        this.notifyService.show('User refresh token revoked')
      }
    })
  }

  openSetRoleDialog() {
    const dialog = this.setRoleDialog = this.dialog.open(SetRoleComponent, {
      data: { userId: this.userId, role: this.user?.role.value }
    })

    let isRoleChanged: boolean = false;
    let selectedRole: SystemRole | undefined;

    dialog.afterClosed().pipe(tap((role: SystemRole) => {
      isRoleChanged = role !== undefined;
      selectedRole = role;
    }), switchMap((role: SystemRole) => {
      if (role) {
        return this.usersService.setRole(this.userId, role)
      }
      return of(null);
    })).safeSubscribe(this, {
      next: () => {
        if (isRoleChanged) {
          this.notifyService.show(`User subscription changed on ${selectedRole}`);
          this.getUserDetails();
        }
      }
    });
  }

  openSetSubscriptionDialog() {
    const dialog = this.dialog.open(SetSubscriptionComponent, {
      data: { userId: this.userId, subscription: this.user?.subscription.value, expiredAt: this.user?.subscription.expiredAt }
    });

    let isSubscribtionChanged: boolean = false;
    let selectedSubscription: string | undefined;

    dialog.afterClosed().pipe(tap((data: SetSubscription) => {
      isSubscribtionChanged = data !== undefined;
      selectedSubscription = data?.subscription;
    }), switchMap((data: SetSubscription) => {
      if (data) {
        return this.usersService.setSubscription(this.userId, data.subscription, data.expiredAt)
      }
      return of(null);
    })).safeSubscribe(this, {
      next: () => {
        if (isSubscribtionChanged) {
          this.notifyService.show(`User subscription changed on ${selectedSubscription}`);
          this.getUserDetails();
        }
      }
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