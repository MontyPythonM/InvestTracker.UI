import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccessGuardService } from '../../core/services/access-guard.service';
import { Visibility } from '../../shared/enums/visibility.enum';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'account'
      },
      {
        path: 'account',
        component: AccountComponent,
        canActivate: [AccessGuardService], 
        data: { visibility: Visibility.LoggedInUsers }
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      }
    ])
  ]
})
export class AccountsModule { }
