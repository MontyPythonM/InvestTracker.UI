import { Component, inject } from '@angular/core';
import { SectionModel } from '../../../core/models/section.model';
import { Router } from '@angular/router';
import { Visibility } from '../../enums/visibility.enum';
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
      { name: "Home", path: "/", icon: "home", visibility: Visibility.Everyone },
      { name: "Investment Strategies", path: "/strategies", icon: "trending_up", visibility: Visibility.LoggedInUsers },
      { name: "Portfolios", path: "/portfolios", icon: "folder", visibility: Visibility.LoggedInUsers },
      { name: "Offers", path: "/offers", icon: "local_offer", visibility: Visibility.Everyone },
      { name: "Calculators", path: "/calculators", icon: "calculate", visibility: Visibility.Everyone },
      { name: "Notifications", path: "/notifications", icon: "notifications", visibility: Visibility.LoggedInUsers },
      { name: "Account", path: "/account", icon: "account_circle", visibility: Visibility.LoggedInUsers },
      { name: "Users", path: "/users", icon: "group", visibility: Visibility.Administrators }
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