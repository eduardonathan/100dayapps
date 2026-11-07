import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { VinylRecord } from "../types/Record";

interface UpdateRecordProps {
  id: string;
  year: number;
  status: string;
}

export class UpdateRecordUseCase {
  private api = api;

  async handle(props: UpdateRecordProps) {
    const { id, ...rest } = props;
    const { data } = await this.api.patch<unknown, AxiosResponse<VinylRecord>>(
      `/records/${id}`,
      rest,
    );
    return data;
  }
}
