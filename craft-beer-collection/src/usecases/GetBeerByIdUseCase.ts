import { api } from "../api/axiosInstance";
import type { Beer } from "../types/Beer";

export class GetBeerByIdUseCase {
  private api = api;

  async handle(id: string) {
    const response = await this.api.get<Beer>(`/beers/${id}`);
    return response.data;
  }
}
