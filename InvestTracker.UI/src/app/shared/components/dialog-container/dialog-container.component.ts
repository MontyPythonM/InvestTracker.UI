import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-container',
  template: `
    <div class="container">
      <a class="close-icon" mat-icon-button color="primary" (click)="close.emit()">
        <mat-icon>close</mat-icon>
      </a>
      <div class="title">{{ title }}</div>
      <ng-content></ng-content>
        <div class="buttons">
          <button mat-raised-button class="close-button" (click)="close.emit()" color="secondary">Close</button>
          <button mat-raised-button class="submit-button" (click)="save.emit()" color="primary" [disabled]="disableSaveButton">Save</button>
        </div>
    </div>
  `,
  styleUrl: './dialog-container.component.scss'
})
export class DialogContainerComponent {
  @Input() title: string = '';
  @Input() disableSaveButton: boolean = false;
  @Output() save = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
}
