import { api } from "../api/axiosInstance";
import type { Perfume } from "../types/Perfume";

export class ListPerfumesUseCase {
  private api = api;

  async handle() {
    const response = await this.api.get<Perfume[]>("/perfumes");
    return response.data;
  }
}
