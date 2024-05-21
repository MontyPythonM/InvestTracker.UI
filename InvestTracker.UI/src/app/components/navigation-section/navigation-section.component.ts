import { Component } from '@angular/core';
import { SectionModel } from '../../shared/models/section.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-section',
  templateUrl: './navigation-section.component.html',
  styleUrls: ['./navigation-section.component.css']
})
export class NavigationSectionComponent {
  sections: SectionModel[];
  currentPath: string = "/";

  constructor(private router: Router) {
    this.sections = [
      { name: "Home", path: "/", icon: "home" },
      { name: "Investment Strategies", path: "/strategies", icon: "trending_up" },
      { name: "Portfolios", path: "/portfolios", icon: "folder" },
      { name: "Offers", path: "/offers", icon: "local_offer" },
      { name: "Calculators", path: "/calculators", icon: "calculate" },
      { name: "Notifications", path: "/notifications", icon: "notifications" },
      { name: "Account", path: "/account", icon: "account_circle" }
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