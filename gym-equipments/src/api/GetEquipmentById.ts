import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Equipment } from "../types/Equipment";

export class GetEquipmentById {
  private api = api;

  async handle(id: string) {
    const { data } = await this.api.get<unknown, AxiosResponse<Equipment>>(
      `/equipments/${id}`,
    );
    return data;
  }
}
