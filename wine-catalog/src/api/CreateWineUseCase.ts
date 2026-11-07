import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Wine } from "../types/Wine";

export type CreateWineInput = Omit<Wine, "id">;

export class CreateWineUseCase {
  private api = api;

  async handle(input: CreateWineInput) {
    const { data } = await this.api.post<unknown, AxiosResponse<Wine>>(`/wines`, input);
    return data;
  }
}
