import { api } from "../api/axiosInstance";
import type { Sneaker } from "../types/Sneaker";

export class GetSneakerByIdUseCase {
  private api = api;

  async handle(id: string) {
    const response = await this.api.get<Sneaker>(`/sneakers/${id}`);
    return response.data;
  }
}
