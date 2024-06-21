import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AccessService } from './access.service';
import { Access } from '../enums/access.enum';

@Injectable({
  providedIn: 'root'
})
export class AccessGuardService implements CanActivate  {
  authenticationService = inject(AuthenticationService);
  accessService = inject(AccessService);
  router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const access = route.data['access'] as Access ?? Access.Everyone;
    const jwt = this.authenticationService.getDecodedToken();

    if (this.accessService.isAccessibleFor(access, jwt)) {
      return true;
    }

    return this.router.createUrlTree(['/home'])
  }
}
