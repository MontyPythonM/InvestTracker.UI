import { Component, Output, EventEmitter } from '@angular/core';
import { APP_NAME, GITHUB_LINK } from '../../shared/constants';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.css']
})
export class HeaderSectionComponent {
  @Output() menuToggle = new EventEmitter<void>();

  appName: string = APP_NAME;
  githubLink: string = GITHUB_LINK;
}