import { Component, Input } from '@angular/core';
import { PropertyField } from '../../models/property-field.model';

@Component({
  selector: 'app-property-grid',
  templateUrl: './property-grid.component.html',
  styleUrl: './property-grid.component.scss'
})
export class PropertyGridComponent {
  @Input({ required: true }) fields: PropertyField[] = [];
  @Input() width: number = 600;
  @Input() height: number = 30;
  protected widthValue = `${this.width}px`
  protected heightValue = `${this.height}px`
}
