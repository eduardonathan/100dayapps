import type { AxiosResponse } from "axios";
import type { MaintenanceRecord } from "../types/MaintenanceRecord";
import { api } from "./axiosInstance";

export class GetMaintenanceById {
  private api = api;
  async handle(id: string) {
    const { data } = await this.api.get<
      unknown,
      AxiosResponse<MaintenanceRecord>
    >(`/maintenanceRecords/${id}`);
    return data;
  }
}
