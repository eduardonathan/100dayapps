import type { AxiosResponse } from "axios";
import { api } from "../../services/api";
import type { Equipment } from "../../typings/models/equipment.model";

interface ListEquipmentsResponse {
  equipments: Equipment[];
}

export class ListEquipmentsUseCase {
  private api = api;

  async handle() {
    const { data } = await this.api.get<
      unknown,
      AxiosResponse<ListEquipmentsResponse>
    >(`/super_admins/equipment_management/equipments`);
    return data.equipments;
  }
}
