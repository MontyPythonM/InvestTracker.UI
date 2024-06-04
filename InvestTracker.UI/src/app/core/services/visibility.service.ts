import { Injectable } from '@angular/core';
import { Visibility } from '../../shared/enums/visibility.enum';
import { SystemRole } from '../enums/system-role.enum';
import { SystemSubscription } from '../enums/system-subscription.enum';
import { Jwt } from '../models/jwt.model';

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {

  IsVisibleFor(visibility: Visibility, jwt: Jwt | null): boolean {
    const subscription = jwt?.system_subscription;
    const role = jwt?.system_role;
    let isVisible: boolean[] = [];

    if (visibility == Visibility.None) isVisible.push(false);
    if (visibility == Visibility.Everyone) isVisible.push(true);
    if (visibility == Visibility.NonLoggedInUsers && jwt == null) isVisible.push(true);
    if (visibility == Visibility.LoggedInUsers && jwt != null) isVisible.push(true);

    if (role != null) {
      if (visibility == Visibility.BusinessAdministrators && role == SystemRole.BusinessAdministrator) isVisible.push(true);
      if (visibility == Visibility.SystemAdministrators && role == SystemRole.SystemAdministrator) isVisible.push(true);
      if (visibility == Visibility.Administrators && (role == SystemRole.SystemAdministrator || role == SystemRole.BusinessAdministrator)) isVisible.push(true);
    }

    if (subscription != null) {
      if (visibility == Visibility.StandardInvestors && subscription == SystemSubscription.StandardInvestor) isVisible.push(true);
      if (visibility == Visibility.ProfessionalInvestors && subscription == SystemSubscription.ProfessionalInvestor) isVisible.push(true);
      if (visibility == Visibility.Advisors && subscription == SystemSubscription.Advisor) isVisible.push(true);
      if (visibility == Visibility.Investors && (subscription == SystemSubscription.StandardInvestor || role == SystemSubscription.ProfessionalInvestor)) isVisible.push(true);
      if (visibility == Visibility.Subscribers && (subscription == SystemSubscription.StandardInvestor || role == SystemSubscription.ProfessionalInvestor || role == SystemSubscription.Advisor)) isVisible.push(true);
    }

    return isVisible.some(reason => reason == true);
  }
}
