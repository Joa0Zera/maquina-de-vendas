import { CaktoClient } from "./cakto-client";
import { CaktoProducts } from "./products";
import { CaktoOffer, CaktoProductResponse } from "./types";

export class CaktoOffers {
  constructor(private client: CaktoClient, private products: CaktoProducts) {}

  async createOffer(data: {
    productId: string;
    name: string;
    price: number;
  }): Promise<CaktoOffer> {
    try {
      const response = await this.client.request<CaktoOffer>("/public_api/offers/", {
        method: "POST",
        body: JSON.stringify(data),
      });

      console.log("Cakto offer created:", response.id);
      return response;
    } catch (error) {
      console.error("Cakto create offer error:", error);
      throw new Error(`Failed to create offer: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  async listOffers(productId?: string): Promise<CaktoOffer[]> {
    try {
      const endpoint = productId ? `/public_api/offers/?productId=${productId}` : "/public_api/offers/";
      const response = await this.client.request<CaktoOffer[]>(endpoint, {
        method: "GET",
      });

      return response;
    } catch (error) {
      console.error("Cakto list offers error:", error);
      throw new Error(`Failed to list offers: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  async getOffer(offerId: string): Promise<CaktoOffer> {
    try {
      const response = await this.client.request<CaktoOffer>(`/public_api/offers/${offerId}/`, {
        method: "GET",
      });

      return response;
    } catch (error) {
      console.error("Cakto get offer error:", error);
      throw new Error(`Failed to get offer: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  async updateOffer(offerId: string, data: Partial<CaktoOffer>): Promise<CaktoOffer> {
    try {
      const response = await this.client.request<CaktoOffer>(`/public_api/offers/${offerId}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });

      console.log("Cakto offer updated:", response.id);
      return response;
    } catch (error) {
      console.error("Cakto update offer error:", error);
      throw new Error(`Failed to update offer: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  async deleteOffer(offerId: string): Promise<void> {
    try {
      await this.client.request(`/public_api/offers/${offerId}/`, {
        method: "DELETE",
      });

      console.log("Cakto offer deleted:", offerId);
    } catch (error) {
      console.error("Cakto delete offer error:", error);
      throw new Error(`Failed to delete offer: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  async createProductWithOffer(data: {
    name: string;
    description?: string;
    price: number;
  }): Promise<CaktoProductResponse> {
    try {
      // Create product
      const product = await this.products.createProduct({
        name: data.name,
        description: data.description,
        price: data.price,
      });

      // Create offer
      const offer = await this.createOffer({
        productId: product.id,
        name: data.name,
        price: data.price,
      });

      // POST /public_api/offers/ não retorna a URL de checkout — segue o
      // padrão da Cakto: https://pay.cakto.com.br/{id_da_oferta}
      return {
        productId: product.id,
        offerId: offer.id,
        checkoutUrl: `https://pay.cakto.com.br/${offer.id}`,
      };
    } catch (error) {
      console.error("Cakto create product with offer error:", error);
      throw new Error(`Failed to create product with offer: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}
