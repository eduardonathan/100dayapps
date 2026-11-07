import type { AxiosResponse } from "axios";
import type { Member } from "../types/Member";
import { api } from "./axiosInstance";

export interface CreateMemberInput {
  name: string;
  plan: string;
  status: string;
}

export class CreateMemberUseCase {
  private api = api;
  async handle(input: CreateMemberInput) {
    const { data } = await this.api.post<unknown, AxiosResponse<Member>>(`/members`, input);
    return data;
  }
}
