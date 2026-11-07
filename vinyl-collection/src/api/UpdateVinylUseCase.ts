import { api } from "./axiosInstance";
import type { UpdateVinylInput, Vinyl } from "../types/Vinyl";

export class UpdateVinylUseCase {
  private api = api;

  async handle({ id, ...rest }: UpdateVinylInput) {
    const response = await this.api.patch<Vinyl>(`/vinyls/${id}`, rest);
    return response.data;
  }
}
