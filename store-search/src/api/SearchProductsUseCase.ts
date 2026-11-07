import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Product } from "../types/Product";

export class SearchProductsUseCase {
  private api = api;

  async handle(searchText: string) {
    const { data } = await this.api.get<unknown, AxiosResponse<Product[]>>(
      `/products?name_like=${searchText}`,
    );
    return data;
  }
}
