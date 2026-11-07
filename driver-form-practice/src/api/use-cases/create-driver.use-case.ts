import type { AxiosResponse } from "axios";
import { api } from "../axiosInstance";
import type { Driver } from "../../types/Driver";

export interface CreateDriverInputProps {
  name: string;
  phone: string;
  license_expires_at: string;
  shift_start: string;
  shift_end: string;
  work_days: number[];
  vehicle_id: number | null;
  fee_per_delivery_cents: number;
  is_active: boolean;
}

export class CreateDriverUseCase {
  private api = api;

  async handle(props: CreateDriverInputProps) {
    const { data } = await this.api.post<unknown, AxiosResponse<Driver>>(
      `/drivers`,
      props,
    );
    return data;
  }
}
