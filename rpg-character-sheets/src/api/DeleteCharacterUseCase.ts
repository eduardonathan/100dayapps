import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";

export class DeleteCharacterUseCase {
  private api = api;

  async handle(id: string) {
    const { data } = await this.api.delete<unknown, AxiosResponse<void>>(`/characters/${id}`);
    return data;
  }
}
