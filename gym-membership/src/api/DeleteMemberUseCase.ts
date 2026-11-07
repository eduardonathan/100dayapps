import { api } from "./axiosInstance";

export class DeleteMemberUseCase {
  private api = api;
  async handle(id: string) {
    await this.api.delete(`/members/${id}`);
  }
}
