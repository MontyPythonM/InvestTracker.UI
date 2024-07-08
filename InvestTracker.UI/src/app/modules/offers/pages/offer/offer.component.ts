import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../shared/abstractions/base.component';
import { OffersService } from '../../services/offers.service';
import { ActivatedRoute } from '@angular/router';
import { OfferDetails } from '../../models/offer-details.model';
import { DateTimeService } from '../../../../shared/services/date-time.service';
import { PropertyField } from '../../../../shared/models/property-field.model';
import { AdvisorDetails } from '../../../../core/models/advisor-details.model';
import { Access } from '../../../../core/enums/access.enum';
import { UpdateOffer } from '../../models/update-offer.model';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.scss'
})
export class OfferComponent extends BaseComponent implements OnInit {
  private offersService = inject(OffersService);
  private route = inject(ActivatedRoute);
  private dateTimeService = inject(DateTimeService);
  offerId: string;
  offerDetails?: OfferDetails;
  offerDetailsFields: PropertyField[] = [];
  advisorDetailsFields: PropertyField[] = [];
  isOfferOwner?: boolean;
  isAdministrator?: boolean;
  isLoggedInUser: boolean;

  constructor() {
    super();
    this.offerId = this.route.snapshot.params['id'];
    this.isLoggedInUser = this.isAccessibleFor(Access.LoggedInUsers);
  }

  ngOnInit(): void {
    this.getOfferDetails();
  }

  openUpdateOfferDialog() {

  }

  openDeleteOfferDialog() {

  }

  private getOfferDetails() {
    this.offersService.getOffer(this.offerId).safeSubscribe(this, {
      next: (result) => {
        this.offerDetails = result;
        this.setOfferDetailsFields(result);
        this.setAdvisorDetailsFields(result.advisor);
        this.isOfferOwner = this.getCurrentUserId() === result.advisor.id;
        this.isAdministrator = this.isAccessibleFor(Access.Administrators);
      }
    });
  }

  private updateOffer(model: UpdateOffer) {
    this.offersService.updateOffer(model).safeSubscribe(this, {
      next: () => {
        this.getOfferDetails();
        this.notifyService.show("Offer updated");
      }
    })
  }

  private deleteOffer() {
    this.offersService.deleteOffer(this.offerId).safeSubscribe(this, {
      next: () => {
        this.getOfferDetails();
        this.notifyService.show("Offer deleted");
      }
    });
  }

  private setOfferDetailsFields = (offer: OfferDetails) => {
    this.offerDetailsFields = [
      { name: 'ID', value: offer.id },
      { name: 'Full name', value: offer.title },
      { name: 'Email', value: offer.description ?? "" },
      { name: 'Price', value: offer.price?.toString() ?? "" },
      { name: 'Created at', value: this.dateTimeService.formatDateTime(offer.createdAt) },
      { name: 'Updated at', value: this.dateTimeService.formatDateTime(offer.updatedAt) },
    ];
  }

  private setAdvisorDetailsFields = (advisor: AdvisorDetails) => {
    this.advisorDetailsFields = [
      { name: 'ID', value: advisor.id },
      { name: 'Full name', value: advisor.fullName },
      { name: 'Email', value: advisor.email },
      { name: 'Phone', value: advisor.phoneNumber },
      { name: 'Biography', value: advisor.bio },
      { name: 'Company', value: advisor.companyName }
    ];
  }
}
