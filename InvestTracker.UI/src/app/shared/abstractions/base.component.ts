import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subject, Subscription, catchError, takeUntil, throwError } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Visibility } from '../../core/enums/visibility.enum';
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

  protected constructor() {
    this.destroy$ = new Subject<void>();
  }

  protected isVisibleFor(visibility: Visibility): boolean {
    let accessToken = this.authenticationService.getDecodedToken();
    return this.visibilityService.isVisibleFor(visibility, accessToken);
  }

  protected isAuthenticated = () => this.authenticationService.hasValidToken();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
