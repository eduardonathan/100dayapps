import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { RentalContract } from "../types/RentalContract";

export class ListRentalContractsUseCase {
  private api = api;

  async handle() {
    const { data } = await this.api.get<
      unknown,
      AxiosResponse<RentalContract[]>
    >(`/rentalContracts`);

    return data;
  }
}
