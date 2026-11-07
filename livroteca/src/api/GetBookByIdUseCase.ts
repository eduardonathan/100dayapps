import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Book } from "../types/Book";

export class GetBookByIdUseCase {
  private api = api;

  async handle(id: string) {
    const { data } = await this.api.get<unknown, AxiosResponse<Book>>(
      `/books/${id}`,
    );
    return data;
  }
}
