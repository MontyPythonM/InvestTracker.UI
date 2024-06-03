import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { AccountService } from '../../services/account.service';
import { DATETIME_FORMAT } from '../../../../core/constants';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  user?: User;
  accountService = inject(AccountService);
  dateTimeFormat = DATETIME_FORMAT;

  ngOnInit(): void {
    this.accountService.getUser().subscribe((data) => {
      this.user = data.body as User;
    })
  }
}