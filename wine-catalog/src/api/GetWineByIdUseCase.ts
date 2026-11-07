import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Wine } from "../types/Wine";

export class GetWineByIdUseCase {
  private api = api;

  async handle(id: string) {
    const { data } = await this.api.get<unknown, AxiosResponse<Wine>>(
      `/wines/${id}`,
    );
    return data;
  }
}
