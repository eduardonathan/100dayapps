import { api } from "../api/axiosInstance";
import type { Plant, ListPlantProps } from "../types/Plant";

export class ListPlantsUseCase {
  private api = api;

  async handle({ search, limit, offset }: ListPlantProps) {
    // json-server 0.17: q = busca full-text, _limit = limite, _start = offset
    const response = await this.api.get<Plant[]>("/plants", {
      params: { q: search, _limit: limit, _start: offset },
    });
    return response.data;
  }
}
