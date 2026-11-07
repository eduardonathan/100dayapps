import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Book } from "../types/Book";

export class ListBooksUseCase {
  private api = api;

  async handle() {
    const { data } = await this.api.get<unknown, AxiosResponse<Book[]>>(
      `/books`,
    );
    return data;
  }
}
