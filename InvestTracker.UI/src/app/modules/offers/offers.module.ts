import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersComponent } from './pages/offers/offers.component';
import { OfferComponent } from './pages/offer/offer.component';
import { RouterModule } from "@angular/router";
import { PaginatorModule } from '../../shared/components/paginator/paginator.module';
import { SpinnerModule } from '../../shared/components/spinner/spinner.module';
import { MaterialModule } from '../../shared/modules/material.module';
import { PropertyGridModule } from '../../shared/components/property-grid/property-grid.module';

@NgModule({
  declarations: [
    OffersComponent,
    OfferComponent
  ],
  imports: [
    CommonModule,
    PaginatorModule,
    SpinnerModule,
    MaterialModule,
    PropertyGridModule,
    RouterModule.forChild([
      {
        path: '',
        component: OffersComponent
      },
      {
        path: 'offers/:id',
        component: OfferComponent
      }
    ])
  ]
})
export class OffersModule { }
