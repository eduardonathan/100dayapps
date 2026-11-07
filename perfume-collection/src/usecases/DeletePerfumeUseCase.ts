import { api } from "../api/axiosInstance";

export class DeletePerfumeUseCase {
  private api = api;

  async handle(id: string) {
    await this.api.delete(`/perfumes/${id}`);
  }
}
