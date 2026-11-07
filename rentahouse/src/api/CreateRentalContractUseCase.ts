import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { RentalContract } from "../types/RentalContract";

interface CreateRentalContractInputProps {
  tenantName: string;
  propertyAddress: string;
  monthlyRent: number;
  startDate: string;
  status: string;
}

export class CreateRentalContractUseCase {
  private api = api;

  async handle(props: CreateRentalContractInputProps) {
    const { data } = await this.api.post<
      unknown,
      AxiosResponse<RentalContract>
    >(`/rentalContracts`, props);
    return data;
  }
}
