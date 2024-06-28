export class CreateOffer {
  title: string;
  description: string;
  price: number;
  tags: string[];

  constructor(title: string, description: string, price: number, tags: string[]) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.tags = tags;
  }
}