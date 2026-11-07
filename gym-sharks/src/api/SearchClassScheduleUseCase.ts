import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { ClassSchedule } from "../types/ClassSchedule";

interface SearchClassSchedulesProps {
  searchText: string;
  limit: number;
}

export class SearchClassSchedulesUseCase {
  private api = api;

  async handle({ searchText, limit }: SearchClassSchedulesProps) {
    const { data } = await this.api.get<
      unknown,
      AxiosResponse<ClassSchedule[]>
    >(
      `/classSchedules?instructor_contains=${searchText}&_per_page=${limit}`,
    );
    return data;
  }
}
