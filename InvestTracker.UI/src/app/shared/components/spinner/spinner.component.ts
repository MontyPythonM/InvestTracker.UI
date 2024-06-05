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
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  @Input() isVisible: boolean = false;
}