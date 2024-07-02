export class AdvisorDetails {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  bio: string;
  companyName: string;
  avatar: string;

  constructor(id: string, fullName: string, email: string, phoneNumber: string,
    bio: string, companyName: string, avatar: string) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.bio = bio;
    this.companyName = companyName;
    this.avatar = avatar;
  }
}