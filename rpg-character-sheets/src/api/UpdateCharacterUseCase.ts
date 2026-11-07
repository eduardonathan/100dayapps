import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Character } from "../types/Character";

interface UpdateCharacterInput {
  name: string;
  class: string;
  level: number;
}

export class UpdateCharacterUseCase {
  private api = api;

  async handle(id: string, input: UpdateCharacterInput) {
    const { data } = await this.api.put<unknown, AxiosResponse<Character>>(`/characters/${id}`, input);
    return data;
  }
}
