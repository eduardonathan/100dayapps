export interface Perfume {
  id: string;
  name: string;
  brand: string;
  volumeMl: number;
  launchYear: number;
  price: number;
}

export interface CreatePerfumeInput {
  name: string;
  brand: string;
  volumeMl: number;
  launchYear: number;
  price: number;
}

export interface UpdatePerfumeInput {
  id: string;
  name?: string;
  brand?: string;
  volumeMl?: number;
  launchYear?: number;
  price?: number;
}
