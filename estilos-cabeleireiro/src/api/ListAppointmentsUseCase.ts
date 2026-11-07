import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Appointment } from "../types/Appointment";

export class ListAppointmentsUseCase {
  private api = api;
  async handle() {
    const { data } = await this.api.get<unknown, AxiosResponse<Appointment[]>>(
      `/appointments`,
    );
    return data;
  }
}
