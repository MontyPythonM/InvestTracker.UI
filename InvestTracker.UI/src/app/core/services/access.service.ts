import { Injectable } from '@angular/core';
import { Access } from '../enums/access.enum';
import { SystemRole } from '../enums/system-role.enum';
import { SystemSubscription } from '../enums/system-subscription.enum';
import { Jwt } from '../models/jwt.model';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  isAccessibleFor(access: Access, jwt: Jwt | null): boolean {
    const role = jwt?.system_role;
    const subscription = jwt?.system_subscription;

    const accessConditions = {
      [Access.None]: () => false,
      [Access.Everyone]: () => true,
      [Access.NonLoggedInUsers]: () => jwt == null,
      [Access.LoggedInUsers]: () => jwt != null,
      [Access.BusinessAdministrators]: () => role === SystemRole.BusinessAdministrator,
      [Access.SystemAdministrators]: () => role === SystemRole.SystemAdministrator,
      [Access.Administrators]: () => role === SystemRole.SystemAdministrator || role === SystemRole.BusinessAdministrator,
      [Access.StandardInvestors]: () => subscription === SystemSubscription.StandardInvestor,
      [Access.ProfessionalInvestors]: () => subscription === SystemSubscription.ProfessionalInvestor,
      [Access.Advisors]: () => subscription === SystemSubscription.Advisor,
      [Access.Investors]: () => subscription === SystemSubscription.StandardInvestor || subscription === SystemSubscription.ProfessionalInvestor,
      [Access.Subscribers]: () => subscription === SystemSubscription.StandardInvestor || subscription === SystemSubscription.ProfessionalInvestor || subscription === SystemSubscription.Advisor,
      [Access.AdministratorsAndAdvisors]: () => role === SystemRole.SystemAdministrator || role === SystemRole.BusinessAdministrator || subscription === SystemSubscription.Advisor
    };

    return accessConditions[access] ? accessConditions[access]() : false;
  }
}
