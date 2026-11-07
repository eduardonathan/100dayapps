import { api } from "../api/axiosInstance";
import type { Comic, UpdateComicInput } from "../types/Comic";

export class UpdateComicUseCase {
  private api = api;

  async handle({ id, ...rest }: UpdateComicInput) {
    const response = await this.api.patch<Comic>(`/comics/${id}`, rest);
    return response.data;
  }
}
