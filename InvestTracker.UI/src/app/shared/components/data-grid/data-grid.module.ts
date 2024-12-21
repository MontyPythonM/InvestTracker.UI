import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataGridComponent} from "./data-grid.component";
import {DxButtonModule, DxDataGridModule, DxFormModule} from 'devextreme-angular';

@NgModule({
  declarations: [
    DataGridComponent
  ],
  exports: [
    DataGridComponent
  ],
  imports: [
    CommonModule,
    DxButtonModule,
    DxDataGridModule,
    DxFormModule
  ]
})
export class DataGridModule { }
