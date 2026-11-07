import { api } from "../api/axiosInstance";

export class DeleteComicUseCase {
  private api = api;

  async handle(id: string) {
    await this.api.delete(`/comics/${id}`);
  }
}
