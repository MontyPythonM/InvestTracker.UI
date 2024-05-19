import { Component } from '@angular/core';
import { APP_NAME, GITHUB_LINK } from '../../shared/constants';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrl: './header-section.component.css'
})
export class HeaderSectionComponent {
  appName: string = APP_NAME;
  githubLink: string = GITHUB_LINK;
}
