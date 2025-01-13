import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {OffersService} from '../../services/offers.service';
import {TableColumn} from '../../../../shared/models/table-column.interface';
import {Offer} from '../../models/offer.model';
import {PagedResponse} from '../../../../core/models/paged-response.model';
import {Access} from '../../../../core/enums/access.enum';
import {DataGridAbstract} from "../../../../shared/components/data-grid/data-grid.abstract";

@Component({
  selector: 'offer-list',
  templateUrl: './offer-list.component.html',
  styleUrl: './offer-list.component.scss'
})
export class OfferListComponent extends DataGridAbstract<Offer> {
  data?: PagedResponse<Offer>;
  columns: TableColumn<Offer>[];
  canAddOffer: boolean = false;

  private router = inject(Router);
  private offersService = inject(OffersService);

  constructor() {
    super();
    this.columns = [
      { columnDef: 'id', header: 'Id', format: (element: Offer) => `${element.id}` },
      { columnDef: 'title', header: 'Title', format: (element: Offer) => `${element.title}` },
      { columnDef: 'description', header: 'Description', format: (element: Offer) => `${element.description}` },
      { columnDef: 'advisorFullName', header: 'Advisor', format: (element: Offer) => `${element.advisorFullName}` },
    ];
    this.canAddOffer = this.isAccessibleFor(Access.Advisors);
  }

  override load(): void {
    this.offersService.getOffers(this.pagedRequest).safeSubscribe(this, {
      next: (response: PagedResponse<Offer>) => {
        this.data = response;
      }
    });
  }

  navigateToDetails(id: string) {
    this.router.navigate!(['/offers', id]);
  }
}
