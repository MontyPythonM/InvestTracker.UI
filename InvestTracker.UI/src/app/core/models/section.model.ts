import { Access } from "../enums/access.enum";

export class SectionModel {
  name: string;
  path: string;
  icon: string;
  access: Access;

  constructor(name: string, path: string, icon: string, access: Access) {
    this.name = name;
    this.path = path;
    this.icon = icon;
    this.access = access;
  }
}