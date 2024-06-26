import { SystemSubscription } from "../../../core/enums/system-subscription.enum";

export class SetSubscription {
  subscription: SystemSubscription;
  expiredAt?: Date;

  constructor(subscription: SystemSubscription, expiredAt?: Date) {
    this.subscription = subscription
    this.expiredAt = expiredAt
  }
}