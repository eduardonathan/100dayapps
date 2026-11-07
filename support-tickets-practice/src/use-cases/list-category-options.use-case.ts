import type { AxiosResponse } from "axios";
import { api } from "../api/axiosInstance";
import type { TicketCategoryOption } from "../types/Ticket";

export interface ListTicketCategoryOptionsResponse {
  categories: TicketCategoryOption[];
}

export class ListTicketCategoryOptionsUseCase {
  private api = api;

  async handle() {
    const { data } = await this.api.get<
      unknown,
      AxiosResponse<ListTicketCategoryOptionsResponse>
    >("/tickets/categories_options");
    return data;
  }
}
