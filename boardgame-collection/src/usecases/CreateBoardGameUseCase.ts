import { api } from "../api/axiosInstance";
import type { BoardGame, CreateBoardGameInput } from "../types/BoardGame";

export class CreateBoardGameUseCase {
  private api = api;

  async handle(input: CreateBoardGameInput) {
    const response = await this.api.post<BoardGame>("/boardgames", input);
    return response.data;
  }
}
