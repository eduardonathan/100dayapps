import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Ticket } from "../types/Ticket";

export class ListTicketsUseCase {
  private api = api;

  async handle() {
    const { data } = await this.api.get<unknown, AxiosResponse<Ticket[]>>(
      `/tickets`,
    );
    return data;
  }
}
