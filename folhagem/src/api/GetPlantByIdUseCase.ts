import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Plant } from "../types/Plant";

export class GetPlantByIdUseCase {
  private api = api;

  async handle(id: string) {
    const { data } = await this.api.get<unknown, AxiosResponse<Plant>>(
      `/plants/${id}`,
    );
    return data;
  }
}
