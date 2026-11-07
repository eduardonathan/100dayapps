export interface Comic {
  id: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  price: number;
}

export interface CreateComicInput {
  title: string;
  author: string;
  publisher: string;
  year: number;
  price: number;
}

export interface UpdateComicInput {
  id: string;
  title?: string;
  author?: string;
  publisher?: string;
  year?: number;
  price?: number;
}
