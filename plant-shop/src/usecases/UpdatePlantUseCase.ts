import { api } from "../api/axiosInstance";
import type { Plant, UpdatePlantInput } from "../types/Plant";

export class UpdatePlantUseCase {
  private api = api;

  async handle({ id, ...rest }: UpdatePlantInput) {
    const response = await this.api.patch<Plant>(`/plants/${id}`, rest);
    return response.data;
  }
}
