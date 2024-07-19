export class UpdateOffer {
  id: string;
  title: string;
  description: string;
  price?: string;
  tags: string[];

  constructor(id: string, title: string, description: string, tags: string[], price?: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price?.toString() ?? undefined;
    this.tags = tags;
  }
}
