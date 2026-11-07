import { api } from "../api/axiosInstance";

export class DeletePlantUseCase {
  private api = api;

  async handle(id: string) {
    await this.api.delete(`/plants/${id}`);
  }
}
