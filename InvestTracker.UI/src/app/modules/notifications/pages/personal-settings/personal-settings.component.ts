import {Component, inject, OnInit} from '@angular/core';
import {BaseComponent} from "../../../../shared/abstractions/base.component";
import {NotificationSettingsService} from "../../services/notification-settings.service";
import {PersonalSettings} from "../../models/personal-settings.model";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-personal-settings',
  templateUrl: './personal-settings.component.html',
  styleUrl: './personal-settings.component.scss'
})
export class PersonalSettingsComponent extends BaseComponent implements OnInit {
  public personalSettings?: PersonalSettings;
  private notificationSettingsService = inject(NotificationSettingsService);

  ngOnInit(): void {
    this.loadSettings();
  }

  protected saveSettings() {
    this.notificationSettingsService.savePersonalSettings(this.personalSettings!).safeSubscribe(this, {
      next: () => {
        this.notifyService.show('Personal notifications settings saved');
        this.loadSettings();
      }
    });
  }

  protected settingChanged(event: MatSlideToggleChange) {
    const settingName = event.source.name as keyof PersonalSettings;
    this.personalSettings![settingName] = event.checked;
  }

  private loadSettings(): void {
    this.notificationSettingsService.getPersonalSettings().safeSubscribe(this, {
      next: (settings: PersonalSettings) => {
        this.personalSettings = settings;
      }
    });
  }
}
