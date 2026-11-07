import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { ClassSchedule } from "../types/ClassSchedule";

export class ListClassSchedulesUseCase {
  private api = api;

  async handle() {
    const { data } = await this.api.get<
      unknown,
      AxiosResponse<ClassSchedule[]>
    >(`/classSchedules`);
    return data;
  }
}
