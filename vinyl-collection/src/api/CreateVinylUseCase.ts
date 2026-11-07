import { api } from "./axiosInstance";
import type { CreateVinylInput, Vinyl } from "../types/Vinyl";

export class CreateVinylUseCase {
  private api = api;

  async handle(input: CreateVinylInput) {
    const response = await this.api.post<Vinyl>("/vinyls", input);
    return response.data;
  }
}
