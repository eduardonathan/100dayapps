import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Plant } from "../types/Plant";

export class ListPlantsUseCase {
  private api = api;

  async handle() {
    const { data } = await this.api.get<unknown, AxiosResponse<Plant[]>>(
      `/plants`,
    );
    return data;
  }
}
