import { Injectable } from '@angular/core';
import { Visibility } from '../../shared/enums/visibility.enum';
import { SystemRole } from '../enums/system-role.enum';
import { SystemSubscription } from '../enums/system-subscription.enum';
import { Jwt } from '../models/jwt.model';

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {

  isVisibleFor(visibility: Visibility, jwt: Jwt | null): boolean {
    const role = jwt?.system_role;
    const subscription = jwt?.system_subscription;

    const visibilityConditions = {
      [Visibility.None]: () => false,
      [Visibility.Everyone]: () => true,
      [Visibility.NonLoggedInUsers]: () => jwt == null,
      [Visibility.LoggedInUsers]: () => jwt != null,
      [Visibility.BusinessAdministrators]: () => role === SystemRole.BusinessAdministrator,
      [Visibility.SystemAdministrators]: () => role === SystemRole.SystemAdministrator,
      [Visibility.Administrators]: () => role === SystemRole.SystemAdministrator || role === SystemRole.BusinessAdministrator,
      [Visibility.StandardInvestors]: () => subscription === SystemSubscription.StandardInvestor,
      [Visibility.ProfessionalInvestors]: () => subscription === SystemSubscription.ProfessionalInvestor,
      [Visibility.Advisors]: () => subscription === SystemSubscription.Advisor,
      [Visibility.Investors]: () => subscription === SystemSubscription.StandardInvestor || subscription === SystemSubscription.ProfessionalInvestor,
      [Visibility.Subscribers]: () => subscription === SystemSubscription.StandardInvestor || subscription === SystemSubscription.ProfessionalInvestor || subscription === SystemSubscription.Advisor
    };

    return visibilityConditions[visibility] ? visibilityConditions[visibility]() : false;
  }
}
