import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersComponent } from './offers.component';
import { OfferComponent } from './offer/offer.component';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    OffersComponent,
    OfferComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: OffersComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'offers'
          },
          {
            path: 'offer',
            component: OfferComponent,
          }
        ]
      }
    ])
  ]
})
export class OffersModule { }
