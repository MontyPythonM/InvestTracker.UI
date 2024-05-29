import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './pages/users/users.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'users'
          }
        ]
      }
    ])
  ]
})
export class UsersModule { }