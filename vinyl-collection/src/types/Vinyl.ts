export interface Vinyl {
  id: string;
  title: string;
  artist: string;
  year: number;
  genre: string;
  price: number;
}

export interface CreateVinylInput {
  title: string;
  artist: string;
  year: number;
  genre: string;
  price: number;
}

export interface UpdateVinylInput {
  id: string;
  title?: string;
  artist?: string;
  year?: number;
  genre?: string;
  price?: number;
}
