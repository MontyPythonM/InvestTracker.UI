import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationSettingsComponent } from './pages/notification-settings/notification-settings.component';

@NgModule({
  declarations: [
    NotificationSettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NotificationSettingsComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'notification-settings'
          }
        ]
      }
    ])
  ]
})
export class NotificationsModule { }
