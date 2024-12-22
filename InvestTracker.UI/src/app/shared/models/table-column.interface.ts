import {IBaseResponse} from "../../core/models/base-response.model";

export interface TableColumn<T extends IBaseResponse> {
  columnDef: string;
  header: string;
  format: (element: T) => string;
}
