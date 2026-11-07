import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Product } from "../types/Product";

export class ListProductsUseCase {
  private api = api;

  async handle() {
    const { data } = await this.api.get<unknown, AxiosResponse<Product[]>>(
      `/products`,
    );
    return data;
  }
}
