import { DatePipe } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { DATETIME_FORMAT, DATE_FORMAT } from '../../core/constants';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {
  private datePipe = inject(DatePipe);

  formatDate(value?: Date) : string {
    return this.datePipe.transform(value, DATE_FORMAT, 'UTC') ?? '';
  }

  formatDateTime(value?: Date) : string {
    return this.datePipe.transform(value, DATETIME_FORMAT, 'UTC') ?? '';
  }
}
