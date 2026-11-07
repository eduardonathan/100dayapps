import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Plant } from "../types/Plant";

interface UpdatePlantProps {
  id: string;
  waterEveryDays: number;
  status: string;
}

export class UpdatePlantUseCase {
  private api = api;

  async handle(props: UpdatePlantProps) {
    const { id, ...rest } = props;
    const { data } = await this.api.patch<unknown, AxiosResponse<Plant>>(
      `/plants/${id}`,
      rest,
    );
    return data;
  }
}
