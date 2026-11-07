import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Ticket } from "../types/Ticket";

interface UpdateTicketProps {
  id: string;
  priority: string;
  status: string;
}

export class UpdateTicketUseCase {
  private api = api;

  async handle(props: UpdateTicketProps) {
    const { id, ...rest } = props;
    const { data } = await this.api.patch<unknown, AxiosResponse<Ticket>>(
      `/tickets/${id}`,
      rest,
    );
    return data;
  }
}
