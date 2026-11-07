import { api } from "../api/axiosInstance";

export class DeleteClubUseCase {
  private api = api;

  async handle(id: string) {
    await this.api.delete(`/clubs/${id}`);
  }
}
