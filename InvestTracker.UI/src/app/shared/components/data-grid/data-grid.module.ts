import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataGridComponent} from "./data-grid.component";
import {DxButtonModule, DxDataGridModule, DxFormModule} from 'devextreme-angular';
import {PaginatorModule} from "../paginator/paginator.module";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    DataGridComponent
  ],
  exports: [
    DataGridComponent
  ],
    imports: [
      CommonModule,
      DxDataGridModule,
      DxFormModule,
      PaginatorModule,
      MatButtonModule,
      MatIconModule
    ]
})
export class DataGridModule { }
