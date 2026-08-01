import { CaktoClient } from "./cakto-client";
import { CaktoProducts } from "./products";
import { CaktoOffers } from "./offers";
import { CaktoConfig, CaktoHealthResponse, CaktoProductResponse } from "./types";

export class CaktoProvider {
  private client: CaktoClient;
  private products: CaktoProducts;
  private offers: CaktoOffers;

  constructor(config: CaktoConfig) {
    this.client = new CaktoClient(config);
    this.products = new CaktoProducts(this.client);
    this.offers = new CaktoOffers(this.client, this.products);
  }

  async health(): Promise<CaktoHealthResponse> {
    return this.client.health();
  }

  async createProductWithOffer(data: {
    name: string;
    description?: string;
    price: number;
  }): Promise<CaktoProductResponse> {
    return this.offers.createProductWithOffer(data);
  }

  async listProducts() {
    return this.products.listProducts();
  }

  async listOffers(productId?: string) {
    return this.offers.listOffers(productId);
  }

  isConnected(): boolean {
    return this.client.isConnected();
  }

  getClient(): CaktoClient {
    return this.client;
  }

  getProducts(): CaktoProducts {
    return this.products;
  }

  getOffers(): CaktoOffers {
    return this.offers;
  }
}

export function createCaktoProvider(): CaktoProvider | null {
  const clientId = process.env.CAKTO_CLIENT_ID;
  const clientSecret = process.env.CAKTO_CLIENT_SECRET;
  const baseUrl = process.env.CAKTO_BASE_URL || "https://api.cakto.com.br";

  if (!clientId || !clientSecret) {
    console.warn("Cakto credentials not configured. Please set CAKTO_CLIENT_ID and CAKTO_CLIENT_SECRET in .env.local");
    return null;
  }

  return new CaktoProvider({
    clientId,
    clientSecret,
    baseUrl,
  });
}

export const caktoProvider = createCaktoProvider();
