export interface CaktoConfig {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
}

export interface CaktoProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface CaktoOffer {
  id: string;
  productId: string;
  name: string;
  price: number;
  status: "active" | "inactive";
  checkoutUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CaktoCheckout {
  id: string;
  offerId: string;
  url: string;
  status: "active" | "inactive";
}

export interface CaktoHealthResponse {
  connected: boolean;
  account?: string;
  products?: number;
  error?: string;
}

export interface CaktoProductResponse {
  productId: string;
  offerId: string;
  checkoutUrl: string;
}

export interface CaktoError {
  message: string;
  code?: string;
  details?: any;
}
