import type { AxiosResponse } from "axios";
import type { Member } from "../types/Member";
import { api } from "./axiosInstance";

export class ListMembersUseCase {
  private api = api;
  async handle() {
    const { data } = await this.api.get<unknown, AxiosResponse<Member[]>>(`/members`);
    return data;
  }
}
