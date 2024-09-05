import { Component, Output, EventEmitter, inject } from '@angular/core';
import { APP_NAME, GITHUB_LINK } from '../../constants';
import { SectionModel } from '../../models/section.model';
import { ThemeService } from '../../services/theme.service';
import { Theme } from '../../enums/theme.enum';
import { NavStateService } from '../../services/nav-state.service';
import { BaseComponent } from '../../../shared/abstractions/base.component';
import { Access } from '../../enums/access.enum';
import { Router } from '@angular/router';
import {SignalrService} from "../../services/signalr.service";

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.scss']
})
export class HeaderSectionComponent extends BaseComponent {
  themeService = inject(ThemeService);
  navStateService = inject(NavStateService);
  router = inject(Router);

  @Output() menuToggle = new EventEmitter<void>();
  appName: string = APP_NAME;
  githubLink: string = GITHUB_LINK;
  sections: SectionModel[];
  isDarkTheme: boolean;
  private signalRService = inject(SignalrService);

  constructor() {
    super();
    this.isDarkTheme = this.themeService.themeSignal() === Theme.Dark;
    this.sections = [
      { name: "Register", path: "/account/register", icon: "home", access: Access.NonLoggedInUsers },
      { name: "Login", path: "/account/login", icon: "login", access: Access.NonLoggedInUsers },
    ];
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDarkTheme = this.themeService.themeSignal() === Theme.Dark;
  }

  toggleNavigationBar() {
    this.menuToggle.emit();
    this.navStateService.toggleState();
  }

  logout() {
    this.authenticationService.revokeToken().safeSubscribe(this, {
      error: () => {
        console.log("Cannot revoke refresh token");
      }
    });
    this.signalRService.stopConnection().safeSubscribe(this, {});
    this.authenticationService.clearToken();
    this.notifyService.show("Successfully logged out");
    this.router.navigateByUrl!('/home');
  }
}
