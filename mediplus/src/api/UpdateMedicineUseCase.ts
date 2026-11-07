import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Medicine } from "../types/Medicine";

interface UpdateMedicineInputProps {
  id: string;
  quantity: number;
  expirationDate: string;
}

export class UpdateMedicineUseCase {
  private api = api;

  async handle(props: UpdateMedicineInputProps) {
    const { id, ...rest } = props;
    const { data } = await this.api.patch<unknown, AxiosResponse<Medicine>>(
      `/medicines/${id}`,
      rest,
    );
    return data;
  }
}
