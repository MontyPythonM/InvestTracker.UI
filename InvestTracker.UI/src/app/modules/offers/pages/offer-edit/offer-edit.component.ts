import {Component, inject, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DECIMAL_REGEX} from "../../../../core/constants";
import {MatChipInputEvent} from "@angular/material/chips";
import {UpdateOffer} from "../../models/update-offer.model";
import {OffersService} from "../../services/offers.service";
import {BaseComponent} from "../../../../shared/abstractions/base.component";
import {ActivatedRoute, Router} from "@angular/router";
import {OfferDetails} from "../../models/offer-details.model";

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrl: './offer-edit.component.scss'
})
export class OfferEditComponent extends BaseComponent implements OnInit {
  protected form?: FormGroup;
  protected tags = signal<string[]>([]);
  protected id: string;
  protected data?: OfferDetails;

  private offersService = inject(OffersService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    super();
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.offersService.getOffer(this.id).safeSubscribe(this, {
      next: (result) => {
        this.data = result;
        this.tags = signal(result.tags);
        this.form = this.formBuilder.group({
          title: [this.data.title, Validators.required],
          description: [this.data.description],
          price: [this.data.price, Validators.pattern(DECIMAL_REGEX)]
        });
      }
    });
  }

  save(): void {
    if (!this.form?.valid) return;

    const offer = this.price?.value
      ? new UpdateOffer(this.id, this.title?.value, this.description.value, this.tags(), this.price?.value)
      : new UpdateOffer(this.id, this.title?.value, this.description.value, this.tags())

    this.offersService.updateOffer(offer).safeSubscribe(this, {
      next: () => {
        this.notifyService.showSuccess("Offer updated");
        this.router.navigate!(['/offers', this.id]);
      }
    })
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
    return this.form?.get('title');
  }

  protected get description() {
    return this.form?.get('description')!;
  }

  protected get price() {
    return this.form?.get('price');
  }
}
