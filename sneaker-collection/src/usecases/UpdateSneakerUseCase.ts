import { api } from "../api/axiosInstance";
import type { Sneaker, UpdateSneakerInput } from "../types/Sneaker";

export class UpdateSneakerUseCase {
  private api = api;

  async handle({ id, ...rest }: UpdateSneakerInput) {
    const response = await this.api.patch<Sneaker>(`/sneakers/${id}`, rest);
    return response.data;
  }
}
