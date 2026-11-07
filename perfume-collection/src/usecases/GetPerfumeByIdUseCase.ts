import { api } from "../api/axiosInstance";
import type { Perfume } from "../types/Perfume";

export class GetPerfumeByIdUseCase {
  private api = api;

  async handle(id: string) {
    const response = await this.api.get<Perfume>(`/perfumes/${id}`);
    return response.data;
  }
}
