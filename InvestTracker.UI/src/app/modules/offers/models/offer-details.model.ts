import { AdvisorDetails } from "../../../core/models/advisor-details.model";

export class OfferDetails {
  id: string;
  title: string;
  description?: string;
  price?: number;
  createdAt: Date;
  updatedAt: Date;
  advisor: AdvisorDetails;
  tags: string[];

  constructor(id: string, title: string, description: string, price: number, createdAt: Date,
    updatedAt: Date, advisor: AdvisorDetails, tags: string[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.advisor = advisor;
    this.tags = tags;
  }
}