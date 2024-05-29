import { Component, Output, EventEmitter } from '@angular/core';
import { APP_NAME, GITHUB_LINK } from '../../constants';
import { Router } from '@angular/router';
import { SectionModel } from '../../models/section.model';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.css']
})
export class HeaderSectionComponent {
  @Output() menuToggle = new EventEmitter<void>();
  appName: string = APP_NAME;
  githubLink: string = GITHUB_LINK;
  sections: SectionModel[];

  constructor(private router: Router) {
    this.sections = [
      { name: "Register", path: "/account/register", icon: "home" },
      { name: "Login", path: "/account/login", icon: "login" },
      { name: "Logout", path: "/account/logout", icon: "exit_to_app" },
    ];
  }
}