import { api } from "../api/axiosInstance";

export class DeleteBoardGameUseCase {
  private api = api;

  async handle(id: string) {
    await this.api.delete(`/boardgames/${id}`);
  }
}
