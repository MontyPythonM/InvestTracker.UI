import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OfferListComponent} from './pages/offer-list/offer-list.component';
import {OfferDetailsComponent} from './pages/offer-details/offer-details.component';
import {RouterModule} from "@angular/router";
import {PaginatorModule} from '../../shared/components/paginator/paginator.module';
import {SpinnerModule} from '../../shared/components/spinner/spinner.module';
import {MaterialModule} from '../../shared/modules/material.module';
import {PropertyGridModule} from '../../shared/components/property-grid/property-grid.module';
import {AddOfferComponent} from './components/add-offer/add-offer.component';
import {DialogContainerModule} from '../../shared/components/dialog-container/dialog-container.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {EditOfferComponent} from './components/edit-offer/edit-offer.component';
import {ConfirmationDialogModule} from '../../shared/components/confirmation-dialog/confirmation-dialog.module';
import {DataGridModule} from "../../shared/components/data-grid/data-grid.module";
import { OfferAddComponent } from './pages/offer-add/offer-add.component';

@NgModule({
  declarations: [
    OfferListComponent,
    OfferDetailsComponent,
    AddOfferComponent,
    EditOfferComponent,
    OfferAddComponent
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
    ConfirmationDialogModule,
    DataGridModule,
    RouterModule.forChild([
      {
        path: '',
        component: OfferListComponent
      },
      {
        path: ':id',
        component: OfferDetailsComponent
      },
      {
        path: 'add',
        component: OfferAddComponent
      }
    ])
  ]
})
export class OffersModule { }
