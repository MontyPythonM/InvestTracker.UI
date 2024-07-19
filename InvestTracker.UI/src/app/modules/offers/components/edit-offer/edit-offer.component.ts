import {Component, inject, signal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DECIMAL_REGEX} from "../../../../core/constants";
import {MatChipInputEvent} from "@angular/material/chips";
import {OfferDetails} from "../../models/offer-details.model";
import {UpdateOffer} from "../../models/update-offer.model";

@Component({
  selector: 'app-edit-offer',
  template: `
    <app-dialog-container title="Add offer" [disableSaveButton]="!this.form.valid" (save)="save()" (close)="close()">
      <form class="form" [formGroup]="form">
        <mat-form-field class="field">
          <input matInput formControlName="title">
          <mat-label>Title</mat-label>
          <mat-error *ngIf="title?.hasError('required')">Title is required</mat-error>
        </mat-form-field>
        <mat-form-field class="field">
          <input matInput formControlName="description">
          <mat-label>Description</mat-label>
        </mat-form-field>
        <mat-form-field class="field">
          <input matInput formControlName="price">
          <mat-label>Price</mat-label>
          <mat-error *ngIf="title?.hasError('pattern')">Must be positive number</mat-error>
        </mat-form-field>
        <mat-form-field class="field">
          <mat-label>Tags</mat-label>
          <mat-chip-grid #chipGrid>
            <mat-chip-row *ngFor="let tag of tags();" (removed)="removeTag(tag)">
              {{ tag }}
              <button matChipRemove>
                <mat-icon>cancel</mat-icon>
              </button>
            </mat-chip-row>
          </mat-chip-grid>
          <input placeholder="New tag..." [matChipInputFor]="chipGrid" [matChipInputAddOnBlur]="true" (matChipInputTokenEnd)="addTag($event)"/>
        </mat-form-field>
      </form>
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
    }
  `]
})
export class EditOfferComponent {
  private readonly dialogRef = inject(MatDialogRef<EditOfferComponent>);
  private readonly data = inject<OfferDetails>(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);
  protected form: FormGroup;
  protected tags = signal<string[]>(this.data.tags);

  constructor() {
    this.form = this.formBuilder.group({
      title: [this.data.title, Validators.required],
      description: [this.data.description],
      price: [this.data.price, Validators.pattern(DECIMAL_REGEX)]
    });
  }

  protected addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.update(tags => [...tags, value]);
    }

    event.chipInput!.clear();
  }

  protected removeTag(tag: string) {
    this.tags.update(tags => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }

      tags.splice(index, 1);
      return [...tags];
    });
  }

  save(): void {
    if (!this.form.valid) {
      return;
    }

    const offer = this.price?.value
      ? new UpdateOffer(this.data.id, this.title?.value, this.description.value, this.tags(), this.price?.value)
      : new UpdateOffer(this.data.id, this.title?.value, this.description.value, this.tags())

    this.dialogRef.close(offer);
  }

  close = (): void => this.dialogRef.close();

  protected get title() {
    return this.form.get('title');
  }

  protected get description() {
    return this.form.get('description')!;
  }

  protected get price() {
    return this.form.get('price');
  }
}
