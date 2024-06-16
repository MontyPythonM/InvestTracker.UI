export class Role {
  value: string;
  grantedAt: Date;
  grantedBy: string;

  constructor(value: string, grantedAt: Date, grantedBy: string) {
    this.value = value;
    this.grantedAt = grantedAt;
    this.grantedBy = grantedBy;
  }
}
