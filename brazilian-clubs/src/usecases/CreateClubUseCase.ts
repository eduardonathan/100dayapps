import { api } from "../api/axiosInstance";
import type { Club, CreateClubInput } from "../types/Club";

export class CreateClubUseCase {
  private api = api;

  async handle(input: CreateClubInput) {
    const response = await this.api.post<Club>("/clubs", input);
    return response.data;
  }
}
