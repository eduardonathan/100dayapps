import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { DeliveryOrder } from "../types/DeliveryOrder";

interface UpdateOrderProps {
  id: string;
  status: string;
  deliveryFee: number;
}

export class UpdateOrderUseCase {
  private api = api;

  async handle(props: UpdateOrderProps) {
    const { id, ...rest } = props;
    const { data } = await this.api.patch<
      unknown,
      AxiosResponse<DeliveryOrder>
    >(`/deliveryOrders/${id}`, rest);
    return data;
  }
}
