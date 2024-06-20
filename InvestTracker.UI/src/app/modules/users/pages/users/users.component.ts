import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../shared/abstractions/base.component';
import { User } from '../../../../core/models/user.model';
import { UsersService } from '../../services/users.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TableColumn } from '../../../../shared/models/table-column.interface';
import { DATETIME_FORMAT } from '../../../../core/constants';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent extends BaseComponent implements OnInit {
  users?: User[];
  columns: TableColumn<User>[];
  displayedColumns: string[];
  usersService = inject(UsersService);
  datePipe = inject(DatePipe);
  router = inject(Router);

  constructor() {
    super();
    this.users = [];
    this.columns = [
      { columnDef: 'id', header: 'Id', format: (element: User) => `${element.id}` },
      { columnDef: 'fullName', header: 'Full name', format: (element: User) => `${element.fullName}` },
      { columnDef: 'email', header: 'Email', format: (element: User) => `${element.email}` },
      { columnDef: 'phone', header: 'Phone', format: (element: User) => `${element.phone}` },
      { columnDef: 'role', header: 'Role', format: (element: User) => `${element.role}` },
      { columnDef: 'subscription', header: 'Subscription', format: (element: User) => `${element.subscription}` },
      { columnDef: 'isActive', header: 'Active', format: (element: User) => `${element.isActive ? 'Yes' : 'No'}` },
      { columnDef: 'createdAt', header: 'Created at', format: (element: User) => `${this.datePipe.transform(element.createdAt, DATETIME_FORMAT)}` },
    ];
    this.displayedColumns = this.columns.map(c => c.columnDef);
  }

  ngOnInit(): void {
    this.usersService.getUsers().safeSubscribe(this, {
        next: (response: User[]) => {
          this.users = response;
        },
        error: (error) => {
          this.notifyService.showError(error);
        }
    });
  }

  navigateToUserDetails(id: string) {
    this.router.navigate(['/users', id]);
  }
}
