import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Member } from "../types/Member";

interface UpdateMemberInputProps {
  id: string;
  plan: string;
  status: string;
}

export class UpdateMemberUseCase {
  private api = api;

  async handle(props: UpdateMemberInputProps) {
    const { id, ...rest } = props;
    const { data } = await this.api.patch<unknown, AxiosResponse<Member>>(
      `/members/${id}`,
      rest,
    );
    return data;
  }
}
