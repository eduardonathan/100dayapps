import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Appointment } from "../types/Appointment";

interface CreateAppointmentInputProps {
  clientName: string;
  service: string;
  professional: string;
  date: string;
  time: string;
  status: string;
}

export class CreateAppointmentUseCase {
  private api = api;

  async handle(props: CreateAppointmentInputProps) {
    const { data } = await this.api.post<unknown, AxiosResponse<Appointment>>(
      `/appointments`,
      props,
    );
    return data;
  }
}
