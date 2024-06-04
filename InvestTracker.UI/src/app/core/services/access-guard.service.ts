import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { VisibilityService } from './visibility.service';
import { Visibility } from '../../shared/enums/visibility.enum';

@Injectable({
  providedIn: 'root'
})
export class AccessGuardService implements CanActivate  {
  authenticationService = inject(AuthenticationService);
  visibilityService = inject(VisibilityService);
  router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const visibility = route.data['visibility'] as Visibility ?? Visibility.Everyone;
    const jwt = this.authenticationService.getDecodedToken();

    if (!this.authenticationService.hasValidToken()) {
      return this.router.createUrlTree(['/account/login'])
    }

    if (this.visibilityService.isVisibleFor(visibility, jwt)) {
      return true;
    }

    return this.router.createUrlTree(['/home'])
  }
}
