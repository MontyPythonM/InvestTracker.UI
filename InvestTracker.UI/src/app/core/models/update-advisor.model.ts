export class UpdateAdvisor {
  id: string;
  phoneNumber: string;
  bio: string;
  companyName: string;
  avatar: string;

  constructor(id: string, phoneNumber: string, bio: string, companyName: string, avatar: string) {
    this.id = id;
    this.phoneNumber = phoneNumber;
    this.bio = bio;
    this.companyName = companyName;
    this.avatar = avatar;
  }
}