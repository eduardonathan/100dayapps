import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Equipment } from "../types/Equipment";

interface UpdateEquipmentInputProps {
  id: string;
  name: string;
  category: string;
  weight: number;
}

export class UpdateEquipmentUseCase {
  private api = api;

  async handle(props: UpdateEquipmentInputProps) {
    const { id, ...rest } = props;
    const { data } = await this.api.patch<unknown, AxiosResponse<Equipment>>(
      `/equipments/${id}`,
      rest,
    );
    return data;
  }
}
