import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { ClassSchedule } from "../types/ClassSchedule";

interface UpdateClassScheduleInputProps {
  id: string;
  instructor: string;
  capacity: number;
  enrolled: number;
}

export class UpdateClassScheduleUseCase {
  private api = api;

  async handle(props: UpdateClassScheduleInputProps) {
    const { id, ...rest } = props;
    const { data } = await this.api.patch<
      unknown,
      AxiosResponse<ClassSchedule>
    >(`/classSchedules/${id}`, rest);
    return data;
  }
}
