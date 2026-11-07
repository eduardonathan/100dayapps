import type { AxiosResponse } from "axios";
import type { Equipment } from "../types/Equipment";
import { api } from "./axiosInstance";

interface CreateEquipmentInputProps {
  name: string;
  category: string;
  weight: number;
}

export class CreateEquipmentUseCase {
  private api = api;

  async handle(props: CreateEquipmentInputProps) {
    const { data } = await this.api.post<unknown, AxiosResponse<Equipment>>(
      `/equipments`,
      props,
    );
    return data;
  }
}
