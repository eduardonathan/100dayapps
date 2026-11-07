import type { AxiosResponse } from "axios";
import { api } from "../../services/api";
import type { Equipment } from "../../typings/models/equipment.model";

interface UpdateEquipmentInputProps {
  id: string;
  name: string;
  serial_number: string;
}

export class UpdateEquipmentUseCase {
  private api = api;

  async handle(props: UpdateEquipmentInputProps) {
    const { id, ...rest } = props;
    const { data } = await this.api.put<unknown, AxiosResponse<Equipment>>(
      `/super_admins/equipment_management/equipments/${id}`,
      rest,
    );
    return data;
  }
}
