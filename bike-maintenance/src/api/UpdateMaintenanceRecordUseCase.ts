import type { AxiosResponse } from "axios";
import type { MaintenanceRecord } from "../types/MaintenanceRecord";
import { api } from "./axiosInstance";

export interface UpdateMaintenanceRecordInput {
  bikeModel: string;
  serviceType: string;
  cost: number;
}

export class UpdateMaintenanceRecordUseCase {
  private api = api;
  async handle(id: string, input: UpdateMaintenanceRecordInput) {
    const { data } = await this.api.put<unknown, AxiosResponse<MaintenanceRecord>>(`/maintenanceRecords/${id}`, input);
    return data;
  }
}
