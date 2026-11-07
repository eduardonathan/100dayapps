import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";

interface CheckCardBinUseCaseInput {
  bin: string;
}

interface CheckCardBinUseCaseResponse {
  brand: string;
  accepted: boolean;
}

export class CheckCardBinUseCase {
  private api = api;

  async handle({ bin }: CheckCardBinUseCaseInput) {
    const { data } = await this.api.post<
      unknown,
      AxiosResponse<CheckCardBinUseCaseResponse>
    >(`/cardBin`, { bin });
    return data;
  }
}
