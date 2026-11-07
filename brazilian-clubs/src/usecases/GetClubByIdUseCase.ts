import { api } from "../api/axiosInstance";
import type { Club } from "../types/Club";

export class GetClubByIdUseCase {
  private api = api;

  async handle(id: string) {
    const response = await this.api.get<Club>(`/clubs/${id}`);
    return response.data;
  }
}
