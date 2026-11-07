import { api } from "../api/axiosInstance";
import type { BoardGame } from "../types/BoardGame";

export class GetBoardGameByIdUseCase {
  private api = api;

  async handle(id: string) {
    const response = await this.api.get<BoardGame>(`/boardgames/${id}`);
    return response.data;
  }
}
