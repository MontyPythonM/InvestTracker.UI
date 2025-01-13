import {BaseComponent} from "../../abstractions/base.component";
import {TableColumn} from "../../models/table-column.interface";
import {Offer} from "../../../modules/offers/models/offer.model";
import {PagedResponse} from "../../../core/models/paged-response.model";
import {IBaseResponse} from "../../../core/models/base-response.model";
import {Directive, OnInit} from "@angular/core";
import {PagedRequest} from "../../../core/models/paged-request.model";

@Directive()
export abstract class DataGridAbstract<TModel extends IBaseResponse> extends BaseComponent implements OnInit{
  abstract columns: TableColumn<Offer>[];
  abstract data?: PagedResponse<TModel>;
  abstract load(request: PagedRequest): void;
  pagedRequest: PagedRequest = PagedRequest.Default();

  reload(event: PagedRequest): void {
    this.pagedRequest = event;
    this.load(this.pagedRequest);
  }

  ngOnInit(): void {
    this.load(this.pagedRequest);
  }
}
