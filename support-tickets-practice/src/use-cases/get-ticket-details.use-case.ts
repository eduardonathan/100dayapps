import type { AxiosResponse } from "axios";
import { api } from "../api/axiosInstance";
import type { Ticket } from "../types/Ticket";

export class GetTicketDetailsUseCase {
  private api = api;

  async handle(id: number) {
    const { data } = await this.api.get<unknown, AxiosResponse<Ticket>>(
      `/tickets/${id}`,
    );
    return data;
  }
}
