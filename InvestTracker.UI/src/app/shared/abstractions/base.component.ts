import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subject, Subscription, catchError, takeUntil, throwError } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Visibility } from '../enums/visibility.enum';
import { VisibilityService } from '../../core/services/visibility.service';
import { NotifyService } from '../services/notify.service';

@Component({
  template: '',
})
export abstract class BaseComponent implements OnDestroy {
  public destroy$: Subject<void>;
  protected authenticationService = inject(AuthenticationService);
  protected visibilityService = inject(VisibilityService);
  protected notifyService  = inject(NotifyService);

  constructor() {
    this.destroy$ = new Subject<void>();
  }

  protected isVisibleFor(visibility: Visibility): boolean {
    let accessToken = this.authenticationService.getDecodedToken();
    return this.visibilityService.isVisibleFor(visibility, accessToken);
  }

  protected safeSubscribe<T>(observable: Observable<T>, next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return observable.pipe(catchError(err => {
      this.handleError(err);
      return throwError(() => err);
    }), takeUntil(this.destroy$))
    .subscribe(next, error, complete);
  }

  protected isAuthenticated = () => this.authenticationService.hasValidToken();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handleError(error: any): void {
    switch (error.status) {
      case 403:
        this.notifyService.show('Action forbidden');
        break;
      default:
        this.notifyService.show('Error occurred');
    }
  }
}
