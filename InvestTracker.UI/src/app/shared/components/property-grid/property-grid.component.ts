import {Component, inject, Input} from '@angular/core';
import { PropertyField } from '../../models/property-field.model';
import {SystemRole} from "../../../core/enums/system-role.enum";
import {SystemSubscription} from "../../../core/enums/system-subscription.enum";
import {AccessService} from "../../../core/services/access.service";
import {AuthenticationService} from "../../../core/services/authentication.service";

@Component({
  selector: 'app-property-grid',
  template: `
    <div class="container">
      <mat-grid-list cols="2" [rowHeight]="heightValue" [ngStyle]="{ 'max-width': widthValue }">
        <div *ngFor="let field of fields">
          <div *ngIf="isVisible(field)">
            <mat-grid-tile>
              <div class="name">{{ field.name }}</div>
            </mat-grid-tile>
            <mat-grid-tile>
              <div class="value">{{ field.value }}</div>
            </mat-grid-tile>
          </div>
        </div>
      </mat-grid-list>
    </div>
  `,
  styles: `
    .name {
      position: absolute;
      left: 0;
      font-weight: 600;
    }

    .value {
      position: absolute;
      left: 0;
    }
  `
})
export class PropertyGridComponent {
  @Input({required: true}) fields!: PropertyField[];
  @Input() width: number = 600;
  @Input() height: number = 30;
  protected widthValue = `${this.width}px`;
  protected heightValue = `${this.height}px`;
  private accessService = inject(AccessService);
  private authenticationService = inject(AuthenticationService);
  private jwt = this.authenticationService.getDecodedToken();

  protected isVisible(field: PropertyField): boolean {
    return field.visibleFor === undefined
      ? true
      : this.accessService.isAccessibleFor(field.visibleFor, this.jwt);
  }
}
