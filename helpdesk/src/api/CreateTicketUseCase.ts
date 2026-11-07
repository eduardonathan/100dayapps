import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Ticket } from "../types/Ticket";

interface CreateTicketInputProps {
  requesterName: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
}

export class CreateTicketUseCase {
  private api = api;

  async handle(props: CreateTicketInputProps) {
    const { data } = await this.api.post<unknown, AxiosResponse<Ticket>>(
      `/tickets`,
      props,
    );
    return data;
  }
}
