import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Equipment } from "../types/Equipment";

export class ListEquipmentsUseCase {
  private api = api;

  async handle() {
    const { data } = await this.api.get<unknown, AxiosResponse<Equipment[]>>(
      `/equipments`,
    );
    return data;
  }
}
