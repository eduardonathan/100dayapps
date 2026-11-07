import { api } from "../api/axiosInstance";
import type { Beer, CreateBeerInput } from "../types/Beer";

export class CreateBeerUseCase {
  private api = api;

  async handle(input: CreateBeerInput) {
    const response = await this.api.post<Beer>("/beers", input);
    return response.data;
  }
}
