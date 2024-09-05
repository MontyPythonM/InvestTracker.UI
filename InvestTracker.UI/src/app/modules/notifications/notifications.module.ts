import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PersonalSettingsComponent} from './pages/personal-settings/personal-settings.component';
import {GlobalSettingsComponent} from './pages/global-settings/global-settings.component';
import {AccessGuardService} from "../../core/services/access-guard.service";
import {Access} from "../../core/enums/access.enum";
import {SettingsComponent} from './pages/settings/settings.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    PersonalSettingsComponent,
    GlobalSettingsComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SettingsComponent,
        canActivate: [AccessGuardService],
        data: { access: Access.LoggedInUsers },
        children: [
          {
            path: 'personal',
            component: PersonalSettingsComponent,
          },
          {
            path: 'global',
            component: GlobalSettingsComponent,
          }
        ]
      }
    ])
  ]
})
export class NotificationsModule { }
