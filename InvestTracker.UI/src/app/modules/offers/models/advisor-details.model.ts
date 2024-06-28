export class AdvisorDetails {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  bio: string;
  companyName: string;
  avatarUrl: string;

  constructor(id: string, fullName: string, email: string, phoneNumber: string,
    bio: string, companyName: string, avatarUrl: string) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.bio = bio;
    this.companyName = companyName;
    this.avatarUrl = avatarUrl;
  }
}