export interface Skateboard {
  id: string;
  model: string;
  brand: string;
  lengthCm: number;
  price: number;
}

export interface CreateSkateboardInput {
  model: string;
  brand: string;
  lengthCm: number;
  price: number;
}

export interface UpdateSkateboardInput {
  id: string;
  model: string;
  brand: string;
  lengthCm: number;
  price: number;
}

export interface ListSkateboardProps {
  search?: string;
  limit: number;
  offset: number;
}
