import { Role } from "./role.model";
import { Subscription } from "./subscription.model";

export class UserDetails {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: Date;
  role: Role;
  subscription: Subscription;

  constructor(id: string, fullName: string, email: string, phone: string, isActive: boolean, createdAt: Date, role: Role, subscription: Subscription) {
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