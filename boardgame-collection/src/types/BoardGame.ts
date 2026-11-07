export interface BoardGame {
  id: string;
  title: string;
  publisher: string;
  minPlayers: number;
  maxPlayers: number;
  price: number;
}

export interface CreateBoardGameInput {
  title: string;
  publisher: string;
  minPlayers: number;
  maxPlayers: number;
  price: number;
}

export interface UpdateBoardGameInput {
  id: string;
  title?: string;
  publisher?: string;
  minPlayers?: number;
  maxPlayers?: number;
  price?: number;
}
