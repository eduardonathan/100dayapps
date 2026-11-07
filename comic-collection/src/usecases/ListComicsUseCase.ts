import { api } from "../api/axiosInstance";
import type { Comic } from "../types/Comic";

export class ListComicsUseCase {
  private api = api;

  async handle() {
    const response = await this.api.get<Comic[]>("/comics");
    return response.data;
  }
}
