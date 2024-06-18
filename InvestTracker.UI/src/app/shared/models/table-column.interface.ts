export interface TableColumn<T> {
  columnDef: string;
  header: string;
  format: (element: T) => string;
}