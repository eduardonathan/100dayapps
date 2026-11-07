import { api } from "../api/axiosInstance";
import type { Comic, CreateComicInput } from "../types/Comic";

export class CreateComicUseCase {
  private api = api;

  async handle(input: CreateComicInput) {
    const response = await this.api.post<Comic>("/comics", input);
    return response.data;
  }
}
