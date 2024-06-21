import { Component, inject } from '@angular/core';
import { SectionModel } from '../../../core/models/section.model';
import { Router } from '@angular/router';
import { Access } from '../../enums/access.enum';
import { BaseComponent } from '../../../shared/abstractions/base.component';

@Component({
  selector: 'app-navigation-section',
  templateUrl: './navigation-section.component.html',
  styleUrls: ['./navigation-section.component.scss']
})
export class NavigationSectionComponent extends BaseComponent {
  sections: SectionModel[];
  currentPath: string = "/";
  router = inject(Router);

  constructor() {
    super();
    this.sections = [
      { name: "Home", path: "/", icon: "home", access: Access.Everyone },
      { name: "Investment Strategies", path: "/strategies", icon: "trending_up", access: Access.LoggedInUsers },
      { name: "Portfolios", path: "/portfolios", icon: "folder", access: Access.LoggedInUsers },
      { name: "Offers", path: "/offers", icon: "local_offer", access: Access.Everyone },
      { name: "Calculators", path: "/calculators", icon: "calculate", access: Access.Everyone },
      { name: "Notifications", path: "/notifications", icon: "notifications", access: Access.LoggedInUsers },
      { name: "Account", path: "/account", icon: "account_circle", access: Access.LoggedInUsers },
      { name: "Users", path: "/users", icon: "group", access: Access.Administrators }
    ];

    this.router.events.subscribe(() => {
      this.currentPath = this.router.url;
    });
  }

  isSectionActive(path: string): boolean {
    return this.currentPath === path;
  }

  getIcon(name: string): string {
    const section = this.sections.find(section => section.name === name);
    return section ? section.icon : 'help_outline';
  }
}