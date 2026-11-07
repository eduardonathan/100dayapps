import { api } from "../api/axiosInstance";
import type { Perfume, UpdatePerfumeInput } from "../types/Perfume";

export class UpdatePerfumeUseCase {
  private api = api;

  async handle({ id, ...rest }: UpdatePerfumeInput) {
    const response = await this.api.patch<Perfume>(`/perfumes/${id}`, rest);
    return response.data;
  }
}
