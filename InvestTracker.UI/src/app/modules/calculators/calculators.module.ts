import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorsComponent } from './pages/calculators/calculators.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CalculatorsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CalculatorsComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'calculators'
          }
        ]
      }
    ])
  ]
})
export class CalculatorsModule { }
