import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrategiesComponent } from './pages/strategies/strategies.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    StrategiesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: StrategiesComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'strategies'
          }
        ]
      }
    ])
  ]
})
export class StrategiesModule { }
