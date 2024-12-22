import {IBaseResponse} from "../../../core/models/base-response.model";

export class Offer implements IBaseResponse {
  id: string;
  title: string;
  description: string;
  advisorFullName: string

  constructor(id: string, title: string, description: string, advisorFullName: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.advisorFullName = advisorFullName;
  }
}
