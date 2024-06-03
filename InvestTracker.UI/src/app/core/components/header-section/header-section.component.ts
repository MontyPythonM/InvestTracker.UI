import { Component, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { APP_NAME, GITHUB_LINK } from '../../constants';
import { SectionModel } from '../../models/section.model';
import { ThemeService } from '../../services/theme.service';
import { Theme } from '../../enums/theme.enum';
import { NavStateService } from '../../services/nav-state.service';
import { AuthenticationService } from '../../services/authentication.service';
import { BaseComponent } from '../../../shared/abstractions/base.component';
import { Visibility } from '../../../shared/enums/visibility.enum';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.scss']
})
export class HeaderSectionComponent extends BaseComponent implements OnInit {
  themeService = inject(ThemeService);
  navStateService = inject(NavStateService);

  @Output() menuToggle = new EventEmitter<void>();
  appName: string = APP_NAME;
  githubLink: string = GITHUB_LINK;
  sections: SectionModel[];
  isDarkTheme: boolean;

  constructor() {
    super();
    this.isDarkTheme = this.themeService.themeSignal() === Theme.Dark;
    this.sections = [
      { name: "Register", path: "/account/register", icon: "home", visibility: Visibility.NonLoggedInUsers },
      { name: "Login", path: "/account/login", icon: "login", visibility: Visibility.NonLoggedInUsers },
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
    this.authenticationService.clearToken();
  }
}