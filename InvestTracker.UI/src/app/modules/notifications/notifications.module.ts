import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NotificationsComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'notifications'
          }
        ]
      }
    ])
  ]
})
export class NotificationsModule { }
