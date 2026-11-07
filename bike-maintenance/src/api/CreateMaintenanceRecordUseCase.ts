import type { AxiosResponse } from "axios";
import type { MaintenanceRecord } from "../types/MaintenanceRecord";
import { api } from "./axiosInstance";

export interface CreateMaintenanceRecordInput {
  bikeModel: string;
  serviceType: string;
  cost: number;
}

export class CreateMaintenanceRecordUseCase {
  private api = api;
  async handle(input: CreateMaintenanceRecordInput) {
    const { data } = await this.api.post<unknown, AxiosResponse<MaintenanceRecord>>(`/maintenanceRecords`, input);
    return data;
  }
}
