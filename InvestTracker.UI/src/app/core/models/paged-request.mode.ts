import { ResultsPerPage } from "../enums/results-per-page.enum";

export class PagedRequest {
  page: number;
  results: ResultsPerPage;

  constructor(page: number, resultsPerPage: ResultsPerPage) {
    this.page = page >= 1 ? page : 1;
    this.results = resultsPerPage;
  }

  static Default = () : PagedRequest => {
    return new PagedRequest(1, ResultsPerPage.Twenty);
  }
}
