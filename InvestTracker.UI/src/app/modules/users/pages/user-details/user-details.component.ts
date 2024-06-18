import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../shared/abstractions/base.component';
import { User } from '../../../../core/models/user.model';
import { UsersService } from '../../services/users.service';
import { ErrorResponse } from '../../../../shared/modules/error-response.model';
import { ActivatedRoute } from '@angular/router';
import { UserDetails } from '../../models/user-details.model';
import { DATETIME_FORMAT } from '../../../../core/constants';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent extends BaseComponent implements OnInit {
  user?: UserDetails;
  userId: string;
  usersService = inject(UsersService);
  route = inject(ActivatedRoute);
  dateTimeFormat = DATETIME_FORMAT;

  constructor() {
    super();
    this.userId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.usersService.getUserDetails(this.userId).safeSubscribe(this, {
      next: (response) => {
        this.user = response.body as UserDetails;
      },
      error: (error) => {
        let errors = error.error as ErrorResponse;
        this.notifyService.show(`${errors.errors[0].exceptionMessage}`);
      }
    });
  }
}
