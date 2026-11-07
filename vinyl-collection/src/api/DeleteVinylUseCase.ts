import { api } from "./axiosInstance";

export class DeleteVinylUseCase {
  private api = api;

  async handle(id: string) {
    await this.api.delete(`/vinyls/${id}`);
  }
}
