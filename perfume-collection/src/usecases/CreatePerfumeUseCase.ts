import { api } from "../api/axiosInstance";
import type { Perfume, CreatePerfumeInput } from "../types/Perfume";

export class CreatePerfumeUseCase {
  private api = api;

  async handle(input: CreatePerfumeInput) {
    const response = await this.api.post<Perfume>("/perfumes", input);
    return response.data;
  }
}
