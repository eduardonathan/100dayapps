import type { AxiosResponse } from "axios";
import type { VinylRecord } from "../types/Record";
import { api } from "./axiosInstance";

interface RecordInputProps {
  albumTitle: string;
  artist: string;
  year: number;
  status: string;
}

export class CreateRecordUseCase {
  private api = api;

  async handle(props: RecordInputProps) {
    const { data } = await this.api.post<unknown, AxiosResponse<VinylRecord>>(
      `/records`,
      props,
    );
    return data;
  }
}
