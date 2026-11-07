import type { AxiosResponse } from "axios";
import type { Plant } from "../types/Plant";
import { api } from "./axiosInstance";

interface PlantInputProps {
  name: string;
  species: string;
  waterEveryDays: number;
  status: string;
}

export class CreatePlantUseCase {
  private api = api;

  async handle(props: PlantInputProps) {
    const { data } = await this.api.post<unknown, AxiosResponse<Plant>>(
      `/plants`,
      props,
    );
    return data;
  }
}
