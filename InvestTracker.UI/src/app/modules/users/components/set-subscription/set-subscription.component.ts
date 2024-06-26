import { Component, inject } from '@angular/core';
import { SystemSubscription, systemSubscriptions } from '../../../../core/enums/system-subscription.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SetSubscription } from '../../models/set-subscription.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-set-subscription',
  template: `
    <app-dialog-container title="Set system subscription" (save)="save()" (close)="close()">
      <mat-form-field class="subscription">
        <mat-label>Subscription</mat-label>
        <mat-select [(value)]="selectedSubscription">
          <mat-option *ngFor="let role of systemSubscriptions" [value]="role">{{ role }}</mat-option>
        </mat-select>
      </mat-form-field>
      <span>
        <mat-form-field class="date">
          <mat-label>Expired at</mat-label>
          <input matInput [matDatepicker]="picker" [disabled]="!hasExpirationDate" (dateChange)="onDateChange($event)">
          <mat-hint>DD/MM/YYYY</mat-hint>
          <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
        <mat-slide-toggle class="toggle" (change)="enableExpirationDate($event)"></mat-slide-toggle>
      </span>
    </app-dialog-container>
  `,
  styles: `
    .subscription {
      width: 400px;
      margin-bottom: 10px;
    }
    .date {
      width: 300px;
    }
    .toggle {
      margin-left: 60px
    }
  `
})
export class SetSubscriptionComponent {
  private readonly dialogRef = inject(MatDialogRef<SetSubscriptionComponent>);
  private readonly data = inject<{ userId: string, subscription: string, expiredAt?: Date }>(MAT_DIALOG_DATA);
  selectedSubscription: string;
  selectedExpiredAt?: Date;
  systemSubscriptions: string[] = systemSubscriptions;
  hasExpirationDate: boolean;

  constructor() {
    this.selectedSubscription = this.data.subscription;
    this.selectedExpiredAt = this.data.expiredAt;
    this.hasExpirationDate = false;
  }

  enableExpirationDate(event: MatSlideToggleChange) {
    this.hasExpirationDate = event.checked;
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.selectedExpiredAt = event.value!;
  }

  save(): void {
    const model = this.hasExpirationDate
      ? new SetSubscription(this.selectedSubscription as SystemSubscription, this.selectedExpiredAt)
      : new SetSubscription(this.selectedSubscription as SystemSubscription, undefined);

    this.dialogRef.close(model);
  }

  close = (): void => this.dialogRef.close();
}
