import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OfferListComponent} from './pages/offer-list/offer-list.component';
import {OfferDetailsComponent} from './pages/offer-details/offer-details.component';
import {RouterModule} from "@angular/router";
import {PaginatorModule} from '../../shared/components/paginator/paginator.module';
import {SpinnerModule} from '../../shared/components/spinner/spinner.module';
import {MaterialModule} from '../../shared/modules/material.module';
import {PropertyGridModule} from '../../shared/components/property-grid/property-grid.module';
import {FormContainerModule} from '../../shared/components/form-container/form-container.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {ConfirmationDialogModule} from '../../shared/components/confirmation-dialog/confirmation-dialog.module';
import {DataGridModule} from "../../shared/components/data-grid/data-grid.module";
import {OfferAddComponent} from './pages/offer-add/offer-add.component';
import {OfferEditComponent} from './pages/offer-edit/offer-edit.component';

@NgModule({
  declarations: [
    OfferListComponent,
    OfferDetailsComponent,
    OfferAddComponent,
    OfferEditComponent
  ],
  imports: [
    CommonModule,
    PaginatorModule,
    SpinnerModule,
    MaterialModule,
    PropertyGridModule,
    FormContainerModule,
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
      },
      {
        path: ':id/edit',
        component: OfferEditComponent
      }
    ])
  ]
})
export class OffersModule { }
