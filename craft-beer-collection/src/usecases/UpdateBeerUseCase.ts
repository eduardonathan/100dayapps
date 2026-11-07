import { api } from "../api/axiosInstance";
import type { Beer, UpdateBeerInput } from "../types/Beer";

export class UpdateBeerUseCase {
  private api = api;

  async handle({ id, ...rest }: UpdateBeerInput) {
    const response = await this.api.patch<Beer>(`/beers/${id}`, rest);
    return response.data;
  }
}
