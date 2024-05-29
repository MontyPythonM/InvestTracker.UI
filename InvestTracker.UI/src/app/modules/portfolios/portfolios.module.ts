import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfoliosComponent } from './pages/portfolios/portfolios.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PortfoliosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PortfoliosComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'portfolios'
          }
        ]
      }
    ])
  ]
})
export class PortfoliosModule { }
