import { api } from "./axiosInstance";

export class DeleteWineUseCase {
  private api = api;

  async handle(id: string): Promise<void> {
    await this.api.delete(`/wines/${id}`);
  }
}
