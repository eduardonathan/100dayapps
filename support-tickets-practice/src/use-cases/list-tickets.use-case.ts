import type { AxiosResponse } from "axios";
import { api } from "../api/axiosInstance";
import type { TicketListItem, TicketStatus } from "../types/Ticket";

export interface ListTicketsResponse {
  tickets: TicketListItem[];
  current_page: number;
  total_pages: number;
  total_count: number;
}

export interface ListTicketsProps {
  page: number;
  status?: TicketStatus;
  categoryId?: number;
  search?: string;
  limit: number;
}

export class ListTicketsUseCase {
  private api = api;

  async handle(props: ListTicketsProps) {
    const { data } = await this.api.get<
      unknown,
      AxiosResponse<ListTicketsResponse>
    >("/tickets", {
      params: {
        offset: props.page,
        limit: props.limit,
        status: props.status,
        category_id: props.categoryId,
        search: props.search || undefined,
      },
    });
    return data;
  }
}
