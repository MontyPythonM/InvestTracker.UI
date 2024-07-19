import {Access} from "../../core/enums/access.enum";

export class PropertyField {
  name: string;
  value: string;
  visibleFor?: Access;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}
