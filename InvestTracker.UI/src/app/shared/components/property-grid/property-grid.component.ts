import { Component, Input } from '@angular/core';
import { PropertyField } from '../../models/property-field.model';

@Component({
  selector: 'app-property-grid',
  template: `
    <div class="container">
      <mat-grid-list cols="2" [rowHeight]="heightValue" [ngStyle]="{ 'max-width': widthValue }">
        <div *ngFor="let field of fields">
          <mat-grid-tile>
            <div class="name">{{ field.name }}</div>
          </mat-grid-tile>
          <mat-grid-tile>
            <div class="value">{{ field.value }}</div>
          </mat-grid-tile>
        </div>
      </mat-grid-list>
    </div>
  `,
  styles: `
    .name {
      position: absolute;
      left: 0px;
      font-weight: 600;
    }

    .value {
      position: absolute;
      left: 0px;
    }
  `
})
export class PropertyGridComponent {
  @Input({ required: true }) fields: PropertyField[] = [];
  @Input() width: number = 600;
  @Input() height: number = 30;
  protected widthValue = `${this.width}px`
  protected heightValue = `${this.height}px`
}
