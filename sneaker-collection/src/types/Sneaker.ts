export interface Sneaker {
  id: string;
  model: string;
  brand: string;
  size: number;
  releaseYear: number;
  price: number;
}

export interface CreateSneakerInput {
  model: string;
  brand: string;
  size: number;
  releaseYear: number;
  price: number;
}

export interface UpdateSneakerInput {
  id: string;
  model?: string;
  brand?: string;
  size?: number;
  releaseYear?: number;
  price?: number;
}
