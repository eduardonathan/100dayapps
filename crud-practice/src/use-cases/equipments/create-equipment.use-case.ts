import type { AxiosResponse } from "axios";
import { api } from "../../services/api";
import type { Equipment } from "../../typings/models/equipment.model";

interface CreateEquipmentInputProps {
  name: string;
  serial_number: string;
}

export class CreateEquipmentUseCase {
  private api = api;

  async handle(props: CreateEquipmentInputProps) {
    const { data } = await this.api.post<unknown, AxiosResponse<Equipment>>(
      `/super_admins/equipment_management/equipments`,
      props,
    );
    return data;
  }
}
