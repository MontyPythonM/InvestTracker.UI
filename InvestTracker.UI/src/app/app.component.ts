import {Component, inject, OnInit} from '@angular/core';
import {ThemeService} from './core/services/theme.service';
import {NavStateService} from './core/services/nav-state.service';
import {NavState} from './core/enums/nav-state.enum';
import {SignalrService} from "./core/services/signalr.service";
import {AuthenticationService} from "./core/services/authentication.service";
import {NotifyService} from "./shared/services/notify.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected title = 'InvestTracker.UI';
  protected isNavBarOpened: boolean;
  protected themeService = inject(ThemeService);
  private navStateService = inject(NavStateService);

  constructor() {
    this.isNavBarOpened = this.navStateService.navStateSignal() === NavState.Opened;
  }
}
