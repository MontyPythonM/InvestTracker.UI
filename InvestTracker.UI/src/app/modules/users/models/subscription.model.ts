import { SubscriptionChangeSource } from '../enums/change-source.enum';

export class Subscription {
  value: string;
  expiredAt: Date;
  changeSource: SubscriptionChangeSource;
  grantedAt?: Date;
  grantedBy?: string;

  constructor(value: string, expiredAt: Date, changeSource: SubscriptionChangeSource, grantedAt?: Date, grantedBy?: string) {
    this.value = value;
    this.grantedAt = grantedAt;
    this.grantedBy = grantedBy;
    this.expiredAt = expiredAt;
    this.changeSource = changeSource;
  }
}
