import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DECIMAL_REGEX} from "../../../../core/constants";
import {MatChipInputEvent} from "@angular/material/chips";
import {CreateOffer} from "../../models/create-offer.model";
import {OffersService} from "../../services/offers.service";
import {BaseComponent} from "../../../../shared/abstractions/base.component";

@Component({
  selector: 'offer-add',
  templateUrl: './offer-add.component.html',
  styleUrl: './offer-add.component.scss'
})
export class OfferAddComponent extends BaseComponent {
  protected form: FormGroup;
  protected tags = signal<string[]>([]);

  private formBuilder = inject(FormBuilder);
  private offersService = inject(OffersService);

  constructor() {
    super();
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      price: ['', Validators.pattern(DECIMAL_REGEX)]
    });
  }

  protected save(): void {
    if (!this.form.valid) return;

    const offer = this.price?.value
      ? new CreateOffer(this.title?.value, this.description.value, this.tags(), this.price?.value)
      : new CreateOffer(this.title?.value, this.description.value, this.tags())

    this.offersService.createOffer(offer).safeSubscribe(this, {
      next: () => {
        this.notifyService.show(`Offer created`);
      }
    });
  }

  close(): void {
    return;
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
