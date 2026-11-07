import type { AxiosResponse } from "axios";
import type { Book } from "../types/Book";
import { api } from "./axiosInstance";

interface BookInputProps {
  title: string;
  author: string;
  year: number;
  status: string;
}

export class CreateBookUseCase {
  private api = api;

  async handle(props: BookInputProps) {
    const { data } = await this.api.post<unknown, AxiosResponse<Book>>(
      `/books`,
      props,
    );
    return data;
  }
}
