import { api } from "../api/axiosInstance";

export class DeleteSneakerUseCase {
  private api = api;

  async handle(id: string) {
    await this.api.delete(`/sneakers/${id}`);
  }
}
