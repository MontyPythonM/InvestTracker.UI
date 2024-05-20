import { Component } from '@angular/core';
import { SectionModel } from '../../shared/models/section.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-section',
  templateUrl: './navigation-section.component.html',
  styleUrl: './navigation-section.component.css'
})
export class NavigationSectionComponent {
  sections: SectionModel[];
  currentPath: string = "/";

  constructor(private router: Router) {
    this.sections = [
      { name: "Home", path: "/" },
      { name: "Investment Strategies", path: "/strategies" },
      { name: "Portfolios", path: "/portfolios" },
      { name: "Offers", path: "/offers" },
      { name: "Calculators", path: "/calculators" },
      { name: "Notifications", path: "/notifications" },
      { name: "Account", path: "/account" }
    ];

    this.router.events.subscribe(() => {
      this.currentPath = this.router.url;
    });
  }

  isActive(path: string): boolean {
    return this.currentPath === path;
  }
}
