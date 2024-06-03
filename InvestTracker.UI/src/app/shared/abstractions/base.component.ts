import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Visibility } from '../enums/visibility.enum';
import { VisibilityService } from '../../core/services/visibility.service';

@Component({
  template: '',
})
export abstract class BaseComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void>;
  protected isLoggedIn: boolean;
  protected authenticationService = inject(AuthenticationService);
  protected visibilityService = inject(VisibilityService);

  constructor() {
    this.ngUnsubscribe = new Subject<void>();
    this.isLoggedIn = false;
  }

  IsVisibleFor(visibility: Visibility): boolean {
    let accessToken = this.authenticationService.getDecodedToken();
    return this.visibilityService.IsVisibleFor(visibility, accessToken);
  }

  // TODO: think about overloading subscribe method and takeUntil

  ngOnInit(): void {
    this.authenticationService.isLogged$.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
