import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OfferDetails} from "../../../modules/offers/models/offer-details.model";
import {ConfirmationDialogData} from "../../models/confirmation-dialog-data.model";

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <div class="container">
      <a class="close-icon" mat-icon-button color="primary" (click)="onAction(false)">
        <mat-icon>close</mat-icon>
      </a>
      <div class="title">{{ data.title }}</div>
      <div class="description">{{ data.description }}</div>
        <div class="buttons">
          <button mat-raised-button class="close-button" (click)="onAction(false)" color="secondary">{{ data.cancelText }}</button>
          <button mat-raised-button class="submit-button" (click)="onAction(true)" color="primary">{{ data.confirmText }}</button>
        </div>
    </div>
  `,
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
  protected readonly data = inject<ConfirmationDialogData>(MAT_DIALOG_DATA);

  onAction = (value: boolean) => this.dialogRef.close(value);
}
