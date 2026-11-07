import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Reservation } from "../types/Reservation";

export class ListReservationsUseCase {
  private api = api;

  async handle() {
    const { data } = await this.api.get<unknown, AxiosResponse<Reservation[]>>(
      `/reservations`,
    );
    return data;
  }
}
