import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Visibility } from '../enums/visibility.enum';
import { VisibilityService } from '../../core/services/visibility.service';

@Component({
  template: '',
})
export abstract class BaseComponent implements OnDestroy {
  private ngUnsubscribe: Subject<void>;
  protected authenticationService = inject(AuthenticationService);
  protected visibilityService = inject(VisibilityService);

  constructor() {
    this.ngUnsubscribe = new Subject<void>();
  }

  isVisibleFor(visibility: Visibility): boolean {
    let accessToken = this.authenticationService.getDecodedToken();
    return this.visibilityService.isVisibleFor(visibility, accessToken);
  }

  // TODO: think about overloading subscribe method and takeUntil

  isAuthenticated = () => this.authenticationService.hasValidToken();

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
