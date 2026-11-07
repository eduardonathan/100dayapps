import { api } from "./axiosInstance";
import type { Member } from "../types/Member";
import type { AxiosResponse } from "axios";

export class ListMemberUseCase {
  private api = api;

  async handle() {
    const { data } = await this.api.get<unknown, AxiosResponse<Member[]>>(
      `/members`,
    );
    return data;
  }
}
