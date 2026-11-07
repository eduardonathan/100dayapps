import { api } from "../api/axiosInstance";
import type { BoardGame } from "../types/BoardGame";

export class ListBoardGamesUseCase {
  private api = api;

  async handle() {
    const response = await this.api.get<BoardGame[]>("/boardgames");
    return response.data;
  }
}
