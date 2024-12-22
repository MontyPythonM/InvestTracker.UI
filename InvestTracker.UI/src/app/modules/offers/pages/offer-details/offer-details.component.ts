import { Component, OnInit, inject } from '@angular/core';
import { BaseComponent } from '../../../../shared/abstractions/base.component';
import { OffersService } from '../../services/offers.service';
import {ActivatedRoute, Router} from '@angular/router';
import { OfferDetails } from '../../models/offer-details.model';
import { DateTimeService } from '../../../../shared/services/date-time.service';
import { PropertyField } from '../../../../shared/models/property-field.model';
import { AdvisorDetails } from '../../../../core/models/advisor-details.model';
import { Access } from '../../../../core/enums/access.enum';
import { UpdateOffer } from '../../models/update-offer.model';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {EditOfferComponent} from "../../components/edit-offer/edit-offer.component";
import {ConfirmationDialogData} from "../../../../shared/models/confirmation-dialog-data.model";

@Component({
  selector: 'offer-details-details',
  templateUrl: './offer-details.component.html',
  styleUrl: './offer-details.component.scss'
})
export class OfferDetailsComponent extends BaseComponent implements OnInit {
  private offersService = inject(OffersService);
  private route = inject(ActivatedRoute);
  private dateTimeService = inject(DateTimeService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  offerId: string;
  offerDetails?: OfferDetails;
  offerDetailsFields: PropertyField[] = [];
  advisorDetailsFields: PropertyField[] = [];
  isOfferOwner?: boolean;
  isAdministrator?: boolean;
  isLoggedInUser: boolean;
  showDeleteDialog: boolean;

  constructor() {
    super();
    this.offerId = this.route.snapshot.params['id'];
    this.isLoggedInUser = this.isAccessibleFor(Access.LoggedInUsers);
    this.showDeleteDialog = false;
  }

  ngOnInit(): void {
    this.getOfferDetails();
  }

  openUpdateOfferDialog() {
    const dialog = this.dialog.open(EditOfferComponent, {
      data: this.offerDetails
    });
    dialog.afterClosed().subscribe((result: UpdateOffer) => {
      if (result) {
        this.updateOffer(result);
      }
    });
  }

  openDeleteOfferDialog() {
    const data = new ConfirmationDialogData("Delete offer-details", "Are you sure you want to delete this offer-details?");
    const dialog = this.dialog.open(ConfirmationDialogComponent, { data });
    dialog.afterClosed().subscribe(result => {
      if (result) {
         this.deleteOffer();
      }
    });
  }

  invite() {
    // TODO: Implement invite functionality
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
        this.notifyService.show("Offer deleted");
        this.router.navigate(['/offers']);
      }
    });
  }

  private setOfferDetailsFields = (offer: OfferDetails) => {
    this.offerDetailsFields = [
      { name: 'ID', value: offer.id, visibleFor: Access.Administrators },
      { name: 'Full name', value: offer.title },
      { name: 'Email', value: offer.description ?? "", visibleFor: Access.LoggedInUsers },
      { name: 'Price', value: offer.price?.toString() ?? "" },
      { name: 'Created at', value: this.dateTimeService.formatDateTime(offer.createdAt), visibleFor: Access.AdministratorsAndAdvisors },
      { name: 'Updated at', value: this.dateTimeService.formatDateTime(offer.updatedAt), visibleFor: Access.AdministratorsAndAdvisors },
    ];
  }

  private setAdvisorDetailsFields = (advisor: AdvisorDetails) => {
    this.advisorDetailsFields = [
      { name: 'ID', value: advisor.id, visibleFor: Access.Administrators },
      { name: 'Full name', value: advisor.fullName },
      { name: 'Email', value: advisor.email, visibleFor: Access.LoggedInUsers },
      { name: 'Phone', value: advisor.phoneNumber, visibleFor: Access.LoggedInUsers },
      { name: 'Biography', value: advisor.bio },
      { name: 'Company', value: advisor.companyName }
    ];
  }
}
