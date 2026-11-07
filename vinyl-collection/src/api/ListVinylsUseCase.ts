import { api } from "./axiosInstance";
import type { Vinyl } from "../types/Vinyl";

export class ListVinylsUseCase {
  private api = api;

  async handle() {
    const response = await this.api.get<Vinyl[]>("/vinyls");
    return response.data;
  }
}
