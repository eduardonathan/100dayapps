import { api } from "../api/axiosInstance";
import type { Beer, ListBeerProps } from "../types/Beer";

export class ListBeersUseCase {
  private api = api;

  async handle({ search, limit, offset }: ListBeerProps) {
    // json-server 0.17: q = busca full-text, _limit = limite, _start = offset
    const response = await this.api.get<Beer[]>("/beers", {
      params: { q: search, _limit: limit, _start: offset },
    });
    return response.data;
  }
}
