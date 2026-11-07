import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Adoption } from "../types/Adoption";

export class ListAdoptionUseCase {
  private api = api;

  async handle() {
    const { data } = await this.api.get<unknown, AxiosResponse<Adoption[]>>(
      `/adoptions`,
    );
    return data;
  }
}
