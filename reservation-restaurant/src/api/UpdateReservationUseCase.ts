import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Reservation } from "../types/Reservation";

interface UpdateReservationInputProps {
  id: string;
  tableNumber: number;
  guests: number;
}

export class UpdateReservationUseCase {
  private api = api;

  async handle(props: UpdateReservationInputProps) {
    const { id, ...rest } = props;
    const { data } = await this.api.patch<unknown, AxiosResponse<Reservation>>(
      `/reservations/${id}`,
      rest,
    );
    return data;
  }
}
