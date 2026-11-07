import type { AxiosResponse } from "axios";
import { api } from "../axiosInstance";
import type { Driver } from "../../types/Driver";

export interface UpdateDriverInputProps {
  driverId: number;
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

export class UpdateDriverUseCase {
  private api = api;

  async handle(props: UpdateDriverInputProps) {
    const { driverId, ...rest } = props;
    const { data } = await this.api.put<unknown, AxiosResponse<Driver>>(
      `/drivers/${driverId}`,
      rest,
    );
    return data;
  }
}
