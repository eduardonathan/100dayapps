import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Adoption } from "../types/Adoption";

export class GetAdoptionByIdUseCase {
  private api = api;

  async handle(id: string) {
    const { data } = await this.api.get<unknown, AxiosResponse<Adoption>>(
      `/adoptions/${id}`,
    );
    return data;
  }
}
