import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OffersService } from '../../services/offers.service';
import { TableColumn } from '../../../../shared/models/table-column.interface';
import { Offer } from '../../models/offer.model';
import { PagedResponse } from '../../../../core/models/paged-response.model';
import { BaseComponent } from '../../../../shared/abstractions/base.component';
import { PagedRequest } from '../../../../core/models/paged-request.mode';
import { Access } from '../../../../core/enums/access.enum';
import { MatDialog } from '@angular/material/dialog';
import { AddOfferComponent } from '../../components/add-offer/add-offer.component';
import { of, switchMap } from 'rxjs';
import { CreateOffer } from '../../models/create-offer.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss'
})
export class OffersComponent extends BaseComponent implements OnInit {
  private usersService = inject(OffersService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private offersService = inject(OffersService);
  pagedResponse?: PagedResponse<Offer>;
  columns: TableColumn<Offer>[];
  displayedColumns: string[];
  canAddOffer: boolean = false;
  private pagedRequest: PagedRequest;

  constructor() {
    super();
    this.columns = [
      { columnDef: 'id', header: 'Id', format: (element: Offer) => `${element.id}` },
      { columnDef: 'title', header: 'Title', format: (element: Offer) => `${element.title}` },
      { columnDef: 'description', header: 'Description', format: (element: Offer) => `${element.description}` },
      { columnDef: 'advisorFullName', header: 'Advisor', format: (element: Offer) => `${element.advisorFullName}` },
    ];
    this.displayedColumns = this.columns.map(c => c.columnDef);
    this.canAddOffer = this.isAccessibleFor(Access.Advisors);
    this.pagedRequest = PagedRequest.Default();
  }

  ngOnInit(): void {
    this.getOffers(this.pagedRequest);
  }

  navigateToDetails(id: string) {
    this.router.navigate(['/offers', id]);
  }

  onPageChanged(event: any) {
    this.pagedRequest = event as PagedRequest;
    this.getOffers(this.pagedRequest);
  }

  openAddOfferDialog() {
    const dialog = this.dialog.open(AddOfferComponent, {
      data: { }
    });

    let offerAdded: boolean = false;
    dialog.afterClosed().pipe(switchMap((model: CreateOffer) => {
      if (model) {
        offerAdded = true;
        return this.offersService.createOffer(model);
      }
      return of(null);
    })).safeSubscribe(this, {
      next: () => {
        if (offerAdded) {
          this.notifyService.show(`Offer created`);
          this.getOffers(this.pagedRequest);
        }
      }
    });
  }

  private getOffers(request: PagedRequest) {
    this.usersService.getOffers(request).safeSubscribe(this, {
      next: (response: PagedResponse<Offer>) => {
        this.pagedResponse = response;
      }
    });
  }
}
