import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataGridComponent} from "./data-grid.component";
import {DxButtonModule, DxDataGridModule, DxFormModule} from 'devextreme-angular';
import {PaginatorModule} from "../paginator/paginator.module";

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
    DxFormModule,
    PaginatorModule
  ]
})
export class DataGridModule { }
