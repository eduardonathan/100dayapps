import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Wine } from "../types/Wine";

export type UpdateWineInput = Partial<Omit<Wine, "id">> & { id: string };

export class UpdateWineUseCase {
  private api = api;

  async handle({ id, ...rest }: UpdateWineInput) {
    const { data } = await this.api.patch<unknown, AxiosResponse<Wine>>(`/wines/${id}`, rest);
    return data;
  }
}
