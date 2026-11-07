import { api } from "../api/axiosInstance";
import type { Plant, CreatePlantInput } from "../types/Plant";

export class CreatePlantUseCase {
  private api = api;

  async handle(input: CreatePlantInput) {
    const response = await this.api.post<Plant>("/plants", input);
    return response.data;
  }
}
