import { api } from "../../services/api";
import type { Category } from "../../typings/models/category.model";
import type { AxiosResponse } from "axios";

interface ListCategoriesResponse {
  categories: Category[];
}

export class ListCategoriesUseCase {
  private api = api;

  async handle() {
    const { data } = await this.api.get<
      unknown,
      AxiosResponse<ListCategoriesResponse>
    >(`/super_admins/equipment_management/categories`);
    return data.categories;
  }
}
