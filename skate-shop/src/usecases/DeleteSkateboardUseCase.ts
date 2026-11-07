import { api } from "../api/axiosInstance";

export class DeleteSkateboardUseCase {
  private api = api;

  async handle(id: string) {
    await this.api.delete(`/skateboards/${id}`);
  }
}
