import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Adoption } from "../types/Adoption";

interface UpdateAdoptionProps {
  id: string;
  age: number;
  status: string;
}

export class UpdateAdoptionUseCase {
  private api = api;

  async handle(props: UpdateAdoptionProps) {
    const { id, ...rest } = props;
    const { data } = await this.api.patch<unknown, AxiosResponse<Adoption>>(
      `/adoptions/${id}`,
      rest,
    );
    return data;
  }
}
