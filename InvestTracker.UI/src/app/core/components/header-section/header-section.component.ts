import { Component, Output, EventEmitter, inject } from '@angular/core';
import { APP_NAME, GITHUB_LINK } from '../../constants';
import { Router } from '@angular/router';
import { SectionModel } from '../../models/section.model';
import { ThemeService } from '../../services/theme.service';
import { Theme } from '../../enums/theme.enum';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.scss']
})
export class HeaderSectionComponent {
  @Output() menuToggle = new EventEmitter<void>();

  appName: string = APP_NAME;
  githubLink: string = GITHUB_LINK;
  sections: SectionModel[];
  themeService: ThemeService = inject(ThemeService);
  isDarkTheme: boolean;

  constructor(private router: Router) {
    this.sections = [
      { name: "Register", path: "/account/register", icon: "home" },
      { name: "Login", path: "/account/login", icon: "login" },
      { name: "Logout", path: "/account/logout", icon: "exit_to_app" },
    ];

    this.isDarkTheme = this.themeService.themeSignal() === Theme.Dark;
  }

  toggleTheme() {
    this.themeService.updateTheme();
    this.isDarkTheme = this.themeService.themeSignal() === Theme.Dark;
  }
}