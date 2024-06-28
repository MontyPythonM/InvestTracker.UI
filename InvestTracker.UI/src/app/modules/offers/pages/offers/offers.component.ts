import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OffersService } from '../../services/offers.service';
import { TableColumn } from '../../../../shared/models/table-column.interface';
import { Offer } from '../../models/offer.model';
import { PagedResponse } from '../../../../core/models/paged-response.model';
import { BaseComponent } from '../../../../shared/abstractions/base.component';
import { PagedRequest } from '../../../../core/models/paged-request.mode';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss'
})
export class OffersComponent extends BaseComponent implements OnInit {
  pagedResponse?: PagedResponse<Offer>;
  columns: TableColumn<Offer>[];
  displayedColumns: string[];
  usersService = inject(OffersService);
  router = inject(Router);

  constructor() {
    super();
    this.columns = [
      { columnDef: 'id', header: 'Id', format: (element: Offer) => `${element.id}` },
      { columnDef: 'title', header: 'Title', format: (element: Offer) => `${element.title}` },
      { columnDef: 'description', header: 'Description', format: (element: Offer) => `${element.description}` },
      { columnDef: 'advisorFullName', header: 'Advisor', format: (element: Offer) => `${element.advisorFullName}` },
    ];
    this.displayedColumns = this.columns.map(c => c.columnDef);
  }

  ngOnInit(): void {
    this.getOffers(PagedRequest.Default());
  }

  navigateToDetails(id: string) {
    this.router.navigate(['/offers', id]);
  }

  onPageChanged(event: any) {
    this.getOffers(event as PagedRequest);
  }

  private getOffers(request: PagedRequest) {
    this.usersService.getOffers(request).safeSubscribe(this, {
      next: (response: PagedResponse<Offer>) => {
        this.pagedResponse = response;
      }
    });
  }
}
