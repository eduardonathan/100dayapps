import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Member } from "../types/Member";

interface CreateMemberInputProps {
  name: string;
  plan: string;
  status: string;
}

export class CreateMemberUseCase {
  private api = api;

  async handle(props: CreateMemberInputProps) {
    const { data } = await this.api.post<unknown, AxiosResponse<Member>>(
      `/members`,
      props,
    );
    return data;
  }
}
