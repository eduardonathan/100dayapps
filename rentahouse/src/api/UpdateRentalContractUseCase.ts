import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { RentalContract } from "../types/RentalContract";

interface UpdateRentalContract {
  id: string;
  monthlyRent: number;
  status: string;
}

export class UpdateRentalContractUseCase {
  private api = api;

  async handle(props: UpdateRentalContract) {
    const { id, ...rest } = props;
    const { data } = await this.api.patch<
      unknown,
      AxiosResponse<RentalContract>
    >(`/rentalContracts/${id}`, rest);
    return data;
  }
}
