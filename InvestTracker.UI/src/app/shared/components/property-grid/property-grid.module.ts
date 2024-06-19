import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyGridComponent } from './property-grid.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    PropertyGridComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule
  ],
  exports: [
    PropertyGridComponent
  ]
})
export class PropertyGridModule { }
