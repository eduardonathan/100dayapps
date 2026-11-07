import { api } from "./axiosInstance";

export class DeleteMaintenanceRecordUseCase {
  private api = api;
  async handle(id: string) {
    await this.api.delete(`/maintenanceRecords/${id}`);
  }
}
