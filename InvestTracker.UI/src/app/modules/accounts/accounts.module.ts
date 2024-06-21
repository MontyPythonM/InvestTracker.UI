import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccessGuardService } from '../../core/services/access-guard.service';
import { Access } from '../../core/enums/access.enum';
import { SpinnerModule } from '../../shared/components/spinner/spinner.module';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { PropertyGridModule } from '../../shared/components/property-grid/property-grid.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    PropertyGridModule,
    RouterModule.forChild([
      {
        path: '',
        component: AccountComponent,
        canActivate: [AccessGuardService],
        data: { access: Access.LoggedInUsers }
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'reset-password/:key',
        component: ResetPasswordComponent
      }
    ])
  ]
})
export class AccountsModule { }
