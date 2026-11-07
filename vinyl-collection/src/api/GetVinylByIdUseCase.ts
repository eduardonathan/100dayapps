import { api } from "./axiosInstance";
import type { Vinyl } from "../types/Vinyl";

export class GetVinylByIdUseCase {
  private api = api;

  async handle(id: string) {
    const response = await this.api.get<Vinyl>(`/vinyls/${id}`);
    return response.data;
  }
}
