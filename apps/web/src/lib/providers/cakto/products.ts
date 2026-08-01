import { CaktoClient } from "./cakto-client";
import { CaktoProduct, CaktoProductResponse } from "./types";

export class CaktoProducts {
  constructor(private client: CaktoClient) {}

  async createProduct(data: {
    name: string;
    description?: string;
    price: number;
  }): Promise<CaktoProduct> {
    try {
      const response = await this.client.request<CaktoProduct>("/public_api/products/", {
        method: "POST",
        body: JSON.stringify(data),
      });

      console.log("Cakto product created:", response.id);
      return response;
    } catch (error) {
      console.error("Cakto create product error:", error);
      throw new Error(`Failed to create product: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  async listProducts(): Promise<CaktoProduct[]> {
    try {
      const response = await this.client.request<CaktoProduct[]>("/public_api/products/", {
        method: "GET",
      });

      return response;
    } catch (error) {
      console.error("Cakto list products error:", error);
      throw new Error(`Failed to list products: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  async getProduct(productId: string): Promise<CaktoProduct> {
    try {
      const response = await this.client.request<CaktoProduct>(`/public_api/products/${productId}/`, {
        method: "GET",
      });

      return response;
    } catch (error) {
      console.error("Cakto get product error:", error);
      throw new Error(`Failed to get product: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  async updateProduct(productId: string, data: Partial<CaktoProduct>): Promise<CaktoProduct> {
    try {
      const response = await this.client.request<CaktoProduct>(`/public_api/products/${productId}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });

      console.log("Cakto product updated:", response.id);
      return response;
    } catch (error) {
      console.error("Cakto update product error:", error);
      throw new Error(`Failed to update product: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      await this.client.request(`/public_api/products/${productId}/`, {
        method: "DELETE",
      });

      console.log("Cakto product deleted:", productId);
    } catch (error) {
      console.error("Cakto delete product error:", error);
      throw new Error(`Failed to delete product: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}
