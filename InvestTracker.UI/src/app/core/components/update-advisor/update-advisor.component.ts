import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateAdvisor } from '../../models/update-advisor.model';
import { AdvisorDetails } from '../../models/advisor-details.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PHONE_REGEX } from '../../constants';

@Component({
  selector: 'app-update-advisor',
  template: `
    <app-dialog-container title="Update advisor profile" [disableSaveButton]="!this.form.valid" (save)="save()" (close)="close()">
      <form [formGroup]="form" (ngSubmit)="save()">
        <div class="form">
          <mat-form-field class="field">
            <input matInput formControlName="phoneNumber">
            <mat-label>Phone</mat-label>
            <mat-error *ngIf="phoneNumber?.hasError('required')">Phone number is required</mat-error>
            <mat-error *ngIf="phoneNumber?.hasError('pattern')">Phone number has wrong format</mat-error>
          </mat-form-field>
          <mat-form-field class="field">
            <input matInput formControlName="bio">
            <mat-label>Biography</mat-label>
          </mat-form-field>
          <mat-form-field class="field">
            <input matInput formControlName="companyName">
            <mat-label>Company</mat-label>
          </mat-form-field>
          <mat-form-field class="field">
            <input matInput formControlName="avatar">
            <mat-label>Avatar</mat-label>
          </mat-form-field>
        </div>
      </form>
      <img class="avatar" [src]="'data:image/jpeg;base64,'+ data.model.avatar"/>
    </app-dialog-container>
  `,
  styles: [`
    .field {
      width: 400px;
      margin-bottom: 10px;
    }
    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: top;
    }
    .avatar {
      max-width: 200px;
      max-height: 200px;
    }
  `]
})
export class UpdateAdvisorComponent {
  private readonly dialogRef = inject(MatDialogRef<UpdateAdvisorComponent>);
  private formBuilder = inject(FormBuilder);
  readonly data = inject<{ model: AdvisorDetails }>(MAT_DIALOG_DATA);
  form: FormGroup;

  constructor() {
    this.form = this.formBuilder.group({
      phoneNumber: [this.data.model.phoneNumber, Validators.pattern(PHONE_REGEX)],
      bio: [this.data.model.bio],
      companyName: [this.data.model.companyName],
      avatar: [this.data.model.avatar]
    });
  }

  save(): void {
    if (!this.form.valid) {
      return;
    }

    const model = new UpdateAdvisor(
      this.data.model.id,
      this.phoneNumber?.value,
      this.bio?.value, this.companyName?.value,
      this.avatar?.value
    );

    this.dialogRef.close(model);
  }

  close = (): void => this.dialogRef.close();

  protected get phoneNumber() {
    return this.form.get('phoneNumber');
  }

  protected get bio() {
    return this.form.get('bio')!;
  }

  protected get companyName() {
    return this.form.get('companyName');
  }

  protected get avatar() {
    return this.form.get('avatar')!;
  }
}
