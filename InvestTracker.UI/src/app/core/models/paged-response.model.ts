import {IBaseResponse} from "./base-response.model";

export class PagedResponse<T extends IBaseResponse> {
  items: T[]
  currentPage: number;
  resultsPerPage: number;
  totalPages: number;
  totalResults: number;
  isEmpty: boolean;

  constructor(items: T[], currentPage: number, resultsPerPage: number, totalPages: number, totalResults: number, isEmpty: boolean) {
    this.items = items;
    this.currentPage = currentPage;
    this.resultsPerPage = resultsPerPage;
    this.totalPages = totalPages;
    this.totalResults = totalResults;
    this.isEmpty = isEmpty;
  }
}
