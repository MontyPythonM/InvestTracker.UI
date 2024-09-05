import {inject, Injectable} from '@angular/core';
import {HttpService} from "../../../shared/services/http.service";
import {Observable} from "rxjs";
import {PersonalSettings} from "../models/personal-settings.model";
import {GlobalSettings} from "../models/global-settings.model";
import {apiUrl} from "../../../shared/environments/api-urls";

@Injectable({
  providedIn: 'root'
})
export class NotificationSettingsService {
  private httpService = inject(HttpService);

  getPersonalSettings() : Observable<PersonalSettings> {
    return this.httpService.get<PersonalSettings>(`${apiUrl.module.notifications}/personalsettings`);
  }

  savePersonalSettings(personalSettings: PersonalSettings) : Observable<void> {
    return this.httpService.put<void>(`${apiUrl.module.notifications}/personalsettings`, { personalSettings: personalSettings });
  }

  getGlobalSettings() : Observable<GlobalSettings> {
    return this.httpService.get<GlobalSettings>(`${apiUrl.module.notifications}/globalsettings`);
  }

  saveGlobalSettings(globalSettings: GlobalSettings) : Observable<void> {
    return this.httpService.put<void>(`${apiUrl.module.notifications}/globalsettings`, { globalSettings: globalSettings });
  }
}
