import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Equipment } from "../types/Equipment";

export class DelteEquipmentUseCase {
  private api = api;

  async handle(id: string): Promise<void> {
    await this.api.delete<unknown, AxiosResponse<Equipment>>(
      `/equipments/${id}`,
    );
  }
}
