import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { DeliveryOrder } from "../types/DeliveryOrder";

export class ListOrdersUseCase {
  private api = api;

  async handle() {
    const { data } = await this.api.get<
      unknown,
      AxiosResponse<DeliveryOrder[]>
    >(`/deliveryOrders`);
    return data;
  }
}
