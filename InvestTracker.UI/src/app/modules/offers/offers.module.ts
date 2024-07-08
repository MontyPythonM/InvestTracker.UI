import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersComponent } from './pages/offers/offers.component';
import { OfferComponent } from './pages/offer/offer.component';
import { RouterModule } from "@angular/router";
import { PaginatorModule } from '../../shared/components/paginator/paginator.module';
import { SpinnerModule } from '../../shared/components/spinner/spinner.module';
import { MaterialModule } from '../../shared/modules/material.module';
import { PropertyGridModule } from '../../shared/components/property-grid/property-grid.module';
import { AddOfferComponent } from './components/add-offer/add-offer.component';
import { DialogContainerModule } from '../../shared/components/dialog-container/dialog-container.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    OffersComponent,
    OfferComponent,
    AddOfferComponent
  ],
  imports: [
    CommonModule,
    PaginatorModule,
    SpinnerModule,
    MaterialModule,
    PropertyGridModule,
    DialogContainerModule,
    ReactiveFormsModule,
    MatChipsModule,
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
