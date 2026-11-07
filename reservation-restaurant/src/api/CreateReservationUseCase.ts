import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Reservation } from "../types/Reservation";

interface CreateReservationInputProps {
  customerName: string;
  tableNumber: number;
  time: string;
  guests: number;
}

export class CreateReservationUseCase {
  private api = api;

  async handle(props: CreateReservationInputProps) {
    const { data } = await this.api.post<unknown, AxiosResponse<Reservation>>(
      `/reservations`,
      props,
    );
    return data;
  }
}
