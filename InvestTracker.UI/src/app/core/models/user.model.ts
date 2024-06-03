export class User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: Date;
  role: string;
  subscription: string;

  constructor(id: string, fullName: string, email: string, phone: string, isActive: boolean, createdAt: Date, role: string, subscription: string) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.role = role;
    this.subscription = subscription;
  }
}
