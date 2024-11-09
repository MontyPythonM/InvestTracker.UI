import {Component, inject} from '@angular/core';
import {ThemeService} from './core/services/theme.service';
import {NavStateService} from './core/services/nav-state.service';
import {NavState} from './core/enums/nav-state.enum';

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
