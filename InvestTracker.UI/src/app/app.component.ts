import { Component, inject } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { NAV_STATE } from './core/constants';
import { NavStateService } from './core/services/nav-state.service';
import { NavState } from './core/enums/nav-state.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'InvestTracker.UI';
  themeService: ThemeService = inject(ThemeService);
  navStateService: NavStateService = inject(NavStateService);
  isNavBarOpened: boolean;

  constructor() {
    this.isNavBarOpened = this.navStateService.navStateSignal() === NavState.Opened;
  }
}
