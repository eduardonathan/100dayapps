import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Character } from "../types/Character";

export class GetCharacterByIdUseCase {
  private api = api;

  async handle(id: string) {
    const { data } = await this.api.get<unknown, AxiosResponse<Character>>(
      `/characters/${id}`,
    );
    return data;
  }
}
