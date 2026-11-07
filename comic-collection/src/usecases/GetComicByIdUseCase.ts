import { api } from "../api/axiosInstance";
import type { Comic } from "../types/Comic";

export class GetComicByIdUseCase {
  private api = api;

  async handle(id: string) {
    const response = await this.api.get<Comic>(`/comics/${id}`);
    return response.data;
  }
}
