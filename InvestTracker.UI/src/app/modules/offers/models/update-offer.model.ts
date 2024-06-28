export class UpdateOffer {
  id: string;
  title: string;
  description: string;
  price: number;
  tags: string[];

  constructor(id: string, title: string, description: string, price: number, tags: string[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.tags = tags;
  }
}