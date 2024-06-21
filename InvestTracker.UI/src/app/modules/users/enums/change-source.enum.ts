import { enumToObjects } from "../../../shared/converters/enum.converter";

export enum SubscriptionChangeSource {
  NeverChanged,
  FromPayment,
  FromAdministrator,
  Expired
}

export const subscriptionChangeSourceObjects = enumToObjects(SubscriptionChangeSource);