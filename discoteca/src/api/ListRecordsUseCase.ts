import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { VinylRecord } from "../types/Record";

export class ListRecordsUseCase {
  private api = api;

  async handle() {
    const { data } = await this.api.get<unknown, AxiosResponse<VinylRecord[]>>(
      `/records`,
    );
    return data;
  }
}
