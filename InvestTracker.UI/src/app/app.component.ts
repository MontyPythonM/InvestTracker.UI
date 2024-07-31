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
export class AppComponent implements OnInit {
  protected title = 'InvestTracker.UI';
  protected isNavBarOpened: boolean;
  protected themeService = inject(ThemeService);
  private navStateService = inject(NavStateService);
  private signalrService = inject(SignalrService);
  private authenticationService = inject(AuthenticationService);
  private notifyService = inject(NotifyService);

  constructor() {
    this.isNavBarOpened = this.navStateService.navStateSignal() === NavState.Opened;
  }

  ngOnInit(): void {
    if (this.authenticationService.hasValidToken()) {
      this.signalrService.buildConnection();
      this.signalrService.startConnection().subscribe(() => {
        this.signalrService.receiveMessage().subscribe((message) => {
          console.log(message);
          this.notifyService.show(message);
        });
      });
    }
  }
}
