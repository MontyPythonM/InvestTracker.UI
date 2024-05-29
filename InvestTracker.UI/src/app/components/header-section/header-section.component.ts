import { Component, Output, EventEmitter } from '@angular/core';
import { APP_NAME, GITHUB_LINK } from '../../shared/constants';
import { Router } from '@angular/router';
import { SectionModel } from '../../shared/models/section.model';

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
      { name: "Register", path: "/register", icon: "home" },
      { name: "Login", path: "/login", icon: "login" },
      { name: "Logout", path: "/logout", icon: "exit_to_app" },
    ];
  }
}