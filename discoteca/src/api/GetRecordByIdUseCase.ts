import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { VinylRecord } from "../types/Record";

export class GetRecordByIdUseCase {
  private api = api;

  async handle(id: string) {
    const { data } = await this.api.get<unknown, AxiosResponse<VinylRecord>>(
      `/records/${id}`,
    );
    return data;
  }
}
