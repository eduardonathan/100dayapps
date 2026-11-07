import { api } from "../api/axiosInstance";
import type { Sneaker, CreateSneakerInput } from "../types/Sneaker";

export class CreateSneakerUseCase {
  private api = api;

  async handle(input: CreateSneakerInput) {
    const response = await this.api.post<Sneaker>("/sneakers", input);
    return response.data;
  }
}
