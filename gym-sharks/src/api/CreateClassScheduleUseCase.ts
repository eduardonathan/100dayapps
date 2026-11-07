import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { ClassSchedule } from "../types/ClassSchedule";

interface CreateClassScheduleInputProps {
  modality: string;
  instructor: string;
  time: string;
  capacity: number;
  enrolled: number;
}

export class CreateClassScheduleUseCase {
  private api = api;

  async handle(props: CreateClassScheduleInputProps) {
    const { data } = await this.api.post<unknown, AxiosResponse<ClassSchedule>>(
      `/classSchedules`,
      props,
    );
    return data;
  }
}
