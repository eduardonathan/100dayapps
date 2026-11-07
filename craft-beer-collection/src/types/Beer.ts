export interface Beer {
  id: string;
  name: string;
  brewery: string;
  style: string;
  abv: number;
  price: number;
}

export interface CreateBeerInput {
  name: string;
  brewery: string;
  style: string;
  abv: number;
  price: number;
}

export interface UpdateBeerInput {
  id: string;
  name?: string;
  brewery?: string;
  style?: string;
  abv?: number;
  price?: number;
}

export interface ListBeerProps {
  search?: string;
  limit: number;
  offset: number;
}
