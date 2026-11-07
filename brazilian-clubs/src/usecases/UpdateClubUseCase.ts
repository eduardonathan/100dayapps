import { api } from "../api/axiosInstance";
import type { Club, UpdateClubInput } from "../types/Club";

export class UpdateClubUseCase {
  private api = api;

  async handle({ id, ...rest }: UpdateClubInput) {
    const response = await this.api.patch<Club>(`/clubs/${id}`, rest);
    return response.data;
  }
}
