import { Component } from '@angular/core';
import { SectionModel } from '../../shared/models/section.model';

@Component({
  selector: 'app-navigation-section',
  templateUrl: './navigation-section.component.html',
  styleUrl: './navigation-section.component.css'
})
export class NavigationSectionComponent {
  sections: SectionModel[];
  isExpanded = false;

  constructor() {
    this.sections = [
      { name: "Home", path: "/" },
      { name: "Investment Strategies", path: "/strategies" },
      { name: "Offers", path: "/offers" },
      { name: "Calculators", path: "/calculators" },
      { name: "Account", path: "/account" }
    ]
  }
}
