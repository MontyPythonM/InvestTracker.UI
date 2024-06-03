export class AccessToken {
  token: string;
  expires: number;
  expiredAt: Date;
  userId: string;
  role?: string;
  subscription?: string;
  email: string;

  constructor(token: string, expires: number, expiredAt: Date, userId: string, role: string, subscription: string, email: string) {
    this.token = token;
    this.expires = expires;
    this.expiredAt = expiredAt;
    this.userId = userId;
    this.role = role;
    this.subscription = subscription;
    this.email = email;
  }
}
