import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { DeliveryOrder } from "../types/DeliveryOrder";

interface CreateOrderInputProps {
  customerName: string;
  restaurant: string;
  status: string;
  deliveryFee: number;
}

export class CreateOrderUseCase {
  private api = api;

  async handle(props: CreateOrderInputProps) {
    const { data } = await this.api.post<unknown, AxiosResponse<DeliveryOrder>>(
      `/deliveryOrders`,
      props,
    );
    return data;
  }
}
