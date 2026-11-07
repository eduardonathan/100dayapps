import type { AxiosResponse } from "axios";
import { api } from "../axiosInstance";
import type { Driver } from "../../types/Driver";

export class GetDriverByIdUseCase {
  private api = api;

  async handle(id: number) {
    const { data } = await this.api.get<unknown, AxiosResponse<Driver>>(
      `/drivers/${id}`,
    );
    return data;
  }
}
