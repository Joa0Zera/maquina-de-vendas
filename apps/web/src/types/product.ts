export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  priceCents: number;
  status: "draft" | "published";
  checkoutUrl?: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInput {
  title: string;
  slug: string;
  description: string;
  priceCents: number;
  status: "draft" | "published";
  checkoutUrl?: string;
}
