import { SubscriptionChangeSource } from '../enums/change-source.enum';

export class Subscription {
  value: string;
  grantedAt: Date;
  grantedBy: string;
  expiredAt: Date;
  changeSource: SubscriptionChangeSource;

  constructor(value: string, grantedAt: Date, grantedBy: string, expiredAt: Date, changeSource: SubscriptionChangeSource) {
    this.value = value;
    this.grantedAt = grantedAt;
    this.grantedBy = grantedBy;
    this.expiredAt = expiredAt;
    this.changeSource = changeSource;
  }
}
