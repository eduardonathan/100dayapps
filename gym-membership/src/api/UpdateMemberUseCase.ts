import type { AxiosResponse } from "axios";
import type { Member } from "../types/Member";
import { api } from "./axiosInstance";

export interface UpdateMemberInput {
  name: string;
  plan: string;
  status: string;
}

export class UpdateMemberUseCase {
  private api = api;
  async handle(id: string, input: UpdateMemberInput) {
    const { data } = await this.api.put<unknown, AxiosResponse<Member>>(`/members/${id}`, input);
    return data;
  }
}
