import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
  <div class="container">
    <mat-progress-spinner *ngIf="isVisible"
      color="primary"
      mode="indeterminate"
      value=50
      strokeWidth=5
      diameter=75>
    </mat-progress-spinner>
  </div>
  `,
  styles: `
    .container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `
})
export class SpinnerComponent {
  @Input({ required: true }) isVisible!: boolean;
}