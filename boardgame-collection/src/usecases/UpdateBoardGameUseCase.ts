import { api } from "../api/axiosInstance";
import type { BoardGame, UpdateBoardGameInput } from "../types/BoardGame";

export class UpdateBoardGameUseCase {
  private api = api;

  async handle({ id, ...rest }: UpdateBoardGameInput) {
    const response = await this.api.patch<BoardGame>(`/boardgames/${id}`, rest);
    return response.data;
  }
}
