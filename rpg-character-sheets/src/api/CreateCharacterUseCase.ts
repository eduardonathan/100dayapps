import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Character } from "../types/Character";

interface CreateCharacterInput {
  name: string;
  class: string;
  level: number;
}

export class CreateCharacterUseCase {
  private api = api;

  async handle(input: CreateCharacterInput) {
    const { data } = await this.api.post<unknown, AxiosResponse<Character>>(`/characters`, input);
    return data;
  }
}
