import type { AxiosResponse } from "axios";
import { api } from "../axiosInstance";
import type { Vehicle } from "../../types/Driver";

export class ListVehiclesUseCase {
  private api = api;

  async handle() {
    const { data } = await this.api.get<unknown, AxiosResponse<Vehicle[]>>(
      `/vehicles`,
    );
    return data;
  }
}
