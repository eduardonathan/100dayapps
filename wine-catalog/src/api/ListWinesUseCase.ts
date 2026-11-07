import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Wine } from "../types/Wine";

export class ListWinesUseCase {
  private api = api;

  async handle() {
    const { data } = await this.api.get<unknown, AxiosResponse<Wine[]>>(`/wines`);
    return data;
  }
}
