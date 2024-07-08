export class CreateOffer {
  title: string;
  description: string;
  price?: string;
  tags: string[];

  constructor(title: string, description: string, tags: string[], price?: number) {
    this.title = title;
    this.description = description;
    this.price = price?.toString() ?? undefined;
    this.tags = tags;
  }
}