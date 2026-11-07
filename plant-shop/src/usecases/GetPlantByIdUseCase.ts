import { api } from "../api/axiosInstance";
import type { Plant } from "../types/Plant";

export class GetPlantByIdUseCase {
  private api = api;

  async handle(id: string) {
    const response = await this.api.get<Plant>(`/plants/${id}`);
    return response.data;
  }
}
