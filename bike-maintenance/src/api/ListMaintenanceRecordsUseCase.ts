import type { AxiosResponse } from "axios";
import type { MaintenanceRecord } from "../types/MaintenanceRecord";
import { api } from "./axiosInstance";

export class ListMaintenanceRecordsUseCase {
  private api = api;
  async handle() {
    const { data } = await this.api.get<unknown, AxiosResponse<MaintenanceRecord[]>>(`/maintenanceRecords`);
    return data;
  }
}
