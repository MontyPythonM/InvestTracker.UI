import {Component, Input} from '@angular/core';
import {BaseComponent} from "../../../../shared/abstractions/base.component";

@Component({
  selector: 'app-global-settings',
  templateUrl: './global-settings.component.html',
  styleUrl: './global-settings.component.scss'
})
export class GlobalSettingsComponent extends BaseComponent {
  @Input({required: true}) disabled: boolean = true;

 
}
