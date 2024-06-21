import { Component, OnDestroy, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Access } from '../../core/enums/access.enum';
import { AccessService } from '../../core/services/access.service';
import { NotifyService } from '../services/notify.service';

@Component({
  template: '',
})
export abstract class BaseComponent implements OnDestroy {
  public destroy$: Subject<void>;
  protected authenticationService = inject(AuthenticationService);
  protected accessService = inject(AccessService);
  protected notifyService  = inject(NotifyService);

  protected constructor() {
    this.destroy$ = new Subject<void>();
  }

  protected isAccessibleFor(access: Access): boolean {
    let accessToken = this.authenticationService.getDecodedToken();
    return this.accessService.isAccessibleFor(access, accessToken);
  }

  protected isAuthenticated = () => this.authenticationService.hasValidToken();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
