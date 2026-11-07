import { api } from "../api/axiosInstance";

export class DeleteBeerUseCase {
  private api = api;

  async handle(id: string) {
    await this.api.delete(`/beers/${id}`);
  }
}
