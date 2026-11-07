import { api } from "../api/axiosInstance";
import type { Skateboard, ListSkateboardProps } from "../types/Skateboard";

export class ListSkateboardsUseCase {
  private api = api;

  async handle({ search, limit, offset }: ListSkateboardProps) {
    // json-server 0.17: q = busca full-text, _limit = limite, _start = offset
    const response = await this.api.get<Skateboard[]>("/skateboards", {
      params: { q: search, _limit: limit, _start: offset },
    });
    return response.data;
  }
}
