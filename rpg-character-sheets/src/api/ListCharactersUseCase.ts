import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Character } from "../types/Character";

export class ListCharactersUseCase {
  private api = api;

  async handle() {
    const { data } = await this.api.get<unknown, AxiosResponse<Character[]>>(`/characters`);
    return data;
  }
}
