import {Component, inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TableColumn} from "../../models/table-column.interface";
import {PagedResponse} from "../../../core/models/paged-response.model";
import {IBaseResponse} from "../../../core/models/base-response.model";
import {ActivatedRoute, Router} from '@angular/router';
import {DataGridAction} from "./data-grid-action.model";
import {DxDataGridComponent} from "devextreme-angular";

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss'
})
export class DataGridComponent<T extends IBaseResponse> implements OnInit {
  @ViewChild('dataGrid', { static: false }) dataGrid!: DxDataGridComponent;
  @Input({required: true}) columns!: TableColumn<T>[];
  @Input({required: true}) data?: PagedResponse<T>;
  @Input({required: true}) onPageChanged!: Function;
  @Input() addButtonAction: DataGridAction;
  @Input() showAddButton: boolean = true;
  @Input() title?: string;

  protected columnDefinitions: string[];

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.columnDefinitions = [];
    this.addButtonAction = DataGridAction.Default(this.defaultAddAction);
  }

  ngOnInit(): void {
    this.columnDefinitions = this.columns.map(x => x.columnDef);
  }

  navigateToDetails(id: string) {
    this.router.navigate!([id], { relativeTo: this.activatedRoute });
  }

  private defaultAddAction = () => {
    this.router.navigate!(['add'], { relativeTo: this.activatedRoute });
  }
}
