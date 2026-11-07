import type { AxiosResponse } from "axios";
import type { Member } from "../types/Member";
import { api } from "./axiosInstance";

export class GetMemberhipByIdUseCase {
  private api = api;
  async handle(id: string) {
    const { data } = await this.api.get<unknown, AxiosResponse<Member>>(
      `/members/${id}`,
    );
    return data;
  }
}
