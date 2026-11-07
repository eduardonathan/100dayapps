import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Medicine } from "../types/Medicine";

interface CreateMedicineInputProps {
  name: string;
  manufacturer: string;
  quantity: number;
  expirationDate: string;
}

export class CreateMedicineUseCase {
  private api = api;

  async handle(props: CreateMedicineInputProps) {
    const { data } = await this.api.post<unknown, AxiosResponse<Medicine>>(
      `/medicines`,
      props,
    );
    return data;
  }
}
