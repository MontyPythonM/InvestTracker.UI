import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../shared/abstractions/base.component';
import { User } from '../../../../core/models/user.model';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { TableColumn } from '../../../../shared/models/table-column.interface';
import { DateTimeService } from '../../../../shared/services/date-time.service';
import { PagedRequest } from '../../../../core/models/paged-request.mode';
import { PagedResponse } from '../../../../core/models/paged-response.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent extends BaseComponent implements OnInit {
  pagedResponse?: PagedResponse<User>;
  columns: TableColumn<User>[];
  displayedColumns: string[];
  usersService = inject(UsersService);
  router = inject(Router);
  dateTimeService = inject(DateTimeService);

  constructor() {
    super();
    this.columns = [
      { columnDef: 'id', header: 'Id', format: (element: User) => `${element.id}` },
      { columnDef: 'fullName', header: 'Full name', format: (element: User) => `${element.fullName}` },
      { columnDef: 'email', header: 'Email', format: (element: User) => `${element.email}` },
      { columnDef: 'phone', header: 'Phone', format: (element: User) => `${element.phone}` },
      { columnDef: 'role', header: 'Role', format: (element: User) => `${element.role}` },
      { columnDef: 'subscription', header: 'Subscription', format: (element: User) => `${element.subscription}` },
      { columnDef: 'isActive', header: 'Active', format: (element: User) => `${element.isActive ? 'Yes' : 'No'}` },
      { columnDef: 'createdAt', header: 'Created at', format: (element: User) => this.dateTimeService.formatDateTime(element.createdAt) },
    ];
    this.displayedColumns = this.columns.map(c => c.columnDef);
  }

  ngOnInit(): void {
    this.getUsers(PagedRequest.Default());
  }

  navigateToDetails(id: string) {
    this.router.navigate(['/users', id]);
  }

  onPageChanged(event: any) {
    this.getUsers(event as PagedRequest);
  }

  private getUsers(request: PagedRequest) {
    this.usersService.getUsers(request).safeSubscribe(this, {
      next: (response: PagedResponse<User>) => {
        this.pagedResponse = response;
      }
    });
  }
}
