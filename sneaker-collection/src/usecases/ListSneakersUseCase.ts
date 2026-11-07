import { api } from "../api/axiosInstance";
import type { Sneaker } from "../types/Sneaker";

export class ListSneakersUseCase {
  private api = api;

  async handle() {
    const response = await this.api.get<Sneaker[]>("/sneakers");
    return response.data;
  }
}
