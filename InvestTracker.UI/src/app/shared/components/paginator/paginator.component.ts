import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PagedRequest } from '../../../core/models/paged-request.mode';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { resultsPerPage } from '../../../core/enums/results-per-page.enum';
import { PagedResponse } from '../../../core/models/paged-response.model';

@Component({
  selector: 'app-paginator',
  template: `
    <div *ngIf="pagedResponse">
      <mat-paginator
        class="paginator"
        [length]="pagedResponse.totalResults"
        [pageSize]="pagedResponse.resultsPerPage"
        [pageSizeOptions]="resultsPerPage"
        aria-label="Select page"
        [showFirstLastButtons]="true"
        [disabled]="isDisabled"
        (page)="paginationRequestChanged($event)">
      </mat-paginator>
    </div>
  `,
  styles: [`
    .paginator {
      margin-top: 10px;
      background-color: transparent;
    }
  `],
  providers: [
    { provide: MatPaginatorIntl, useClass: this }
  ]
})
export class PaginatorComponent<T> extends MatPaginatorIntl {
  @Input() initialRequest?: PagedRequest = PagedRequest.Default();
  @Input() pagedResponse?: PagedResponse<T>;
  @Input() isDisabled?: boolean = false;
  @Output() pageChanged = new EventEmitter<PagedRequest>();
  protected resultsPerPage = resultsPerPage;

  paginationRequestChanged(event: PageEvent) {
    const request = new PagedRequest(event.pageIndex + 1, event.pageSize);
    this.pageChanged.emit(request);
  }

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    return `Page ${page + 1} of ${Math.ceil(length/pageSize)}`;
  }
}