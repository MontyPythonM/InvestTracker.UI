import { Visibility } from "../../shared/enums/visibility.enum";

export class SectionModel {
  name: string;
  path: string;
  icon: string;
  visibility: Visibility;

  constructor(name: string, path: string, icon: string, visibility: Visibility) {
    this.name = name;
    this.path = path;
    this.icon = icon;
    this.visibility = visibility;
  }
}