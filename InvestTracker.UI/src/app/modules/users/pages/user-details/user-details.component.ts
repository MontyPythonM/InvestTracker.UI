import { Component } from '@angular/core';
import { BaseComponent } from '../../../../shared/abstractions/base.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent extends BaseComponent {

  constructor() {
    super();
  }
}
