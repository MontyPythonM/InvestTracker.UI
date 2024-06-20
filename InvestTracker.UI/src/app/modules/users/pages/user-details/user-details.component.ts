import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../shared/abstractions/base.component';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { UserDetails } from '../../models/user-details.model';
import { DATETIME_FORMAT } from '../../../../core/constants';
import { PropertyField } from '../../../../shared/models/property-field.model';
import { DatePipe } from '@angular/common';
import { subscriptionChangeSourceObjects } from '../../enums/change-source.enum';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent extends BaseComponent implements OnInit {
  user?: UserDetails;
  userId: string;
  dateTimeFormat = DATETIME_FORMAT;
  accountFields: PropertyField[] = [];
  roleFields: PropertyField[] = [];
  subscriptionFields: PropertyField[] = [];
  usersService = inject(UsersService);
  route = inject(ActivatedRoute);
  datePipe = inject(DatePipe);

  constructor() {
    super();
    this.userId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.usersService.getUserDetails(this.userId).safeSubscribe(this, {
      next: (response: UserDetails) => {
        this.user = response;
        this.accountFields = [
          { name: 'ID', value: this.user.id },
          { name: 'Full name', value: this.user.fullName },
          { name: 'Email', value: this.user.email },
          { name: 'Phone', value: this.user.phone },
          { name: 'Active', value: this.user.isActive ? "Yes" : "No" },
          { name: 'Created at', value: `${this.datePipe.transform(this.user.createdAt, this.dateTimeFormat)}` },
        ];
        this.roleFields = [
          { name: 'Role', value: this.user.role.value },
          { name: 'Granted by', value: `${this.user.role.grantedBy}` },
          { name: 'Granted at', value: `${this.datePipe.transform(this.user.role.grantedAt, this.dateTimeFormat)}` },
        ];
        this.subscriptionFields = [
          { name: 'Subscription', value: this.user.subscription.value },
          { name: 'Expired at', value: `${this.datePipe.transform(this.user.subscription.expiredAt, this.dateTimeFormat)}` },
          { name: 'Change source', value: `${subscriptionChangeSourceObjects.find(x => x.index == this.user?.subscription.changeSource)?.value}` },
          { name: 'Granted by', value: `${this.user.subscription.grantedBy}` },
          { name: 'Granted at', value: `${this.datePipe.transform(this.user.subscription.grantedAt, this.dateTimeFormat)}` },
        ];
      },
      error: (error) => {
        this.notifyService.showError(error);
      }
    });
  }
}
