import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";

export class DeleteTicketUseCase {
  private api = api;

  async handle(id: string): Promise<void> {
    await this.api.delete<unknown, AxiosResponse>(`/tickets/${id}`);
  }
}
