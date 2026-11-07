export interface Club {
  id: string;
  name: string;
  city: string;
  state: string;
  foundedYear: number;
  titles: number;
}

export interface CreateClubInput {
  name: string;
  city: string;
  state: string;
  foundedYear: number;
  titles: number;
}

export interface UpdateClubInput {
  id: string;
  name?: string;
  city?: string;
  state?: string;
  foundedYear?: number;
  titles?: number;
}

export interface ListClubProps {
  search?: string;
  limit?: number;
  offset?: number;
}
