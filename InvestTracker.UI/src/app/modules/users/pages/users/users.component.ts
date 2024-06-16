import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../shared/abstractions/base.component';
import { User } from '../../../../core/models/user.model';
import { UsersService } from '../../services/users.service';
import { ErrorResponse } from '../../../../shared/modules/error-response.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent extends BaseComponent implements OnInit {
  users?: User[];
  usersService = inject(UsersService);
  datePipe = inject(DatePipe);

  constructor() {
    super();
    this.users = [];
  }

  ngOnInit(): void {
    this.usersService.getUsers().safeSubscribe(this, {
        next: (response) => {
          this.users = response.body as User[];
        },
        error: (error) => {
          let errors = error.error as ErrorResponse;
          this.notifyService.show(`${errors.errors[0].exceptionMessage}`);
        }
    });
  }

  columns = [
    { columnDef: 'id', header: 'Id', cell: (element: User) => `${element.id}` },
    { columnDef: 'fullName', header: 'Full name', cell: (element: User) => `${element.fullName}` },
    { columnDef: 'email', header: 'Email', cell: (element: User) => `${element.email}` },
    { columnDef: 'phone', header: 'Phone', cell: (element: User) => `${element.phone}` },
    { columnDef: 'role', header: 'Role', cell: (element: User) => `${element.role}` },
    { columnDef: 'subscription', header: 'Subscription', cell: (element: User) => `${element.subscription}` },
    { columnDef: 'isActive', header: 'Active', cell: (element: User) => `${element.isActive ? 'Yes' : 'No'}` },
    { columnDef: 'createdAt', header: 'Created at', cell: (element: User) => `${this.datePipe.transform(element.createdAt, 'dd/MM/yyyy HH:mm:ss')}` },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);
}
