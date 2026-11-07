import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Book } from "../types/Book";

interface UpdateBookProps {
  id: string;
  year: number;
  status: string;
}

export class UpdateBookUseCase {
  private api = api;

  async handle(props: UpdateBookProps) {
    const { id, ...rest } = props;
    const { data } = await this.api.patch<unknown, AxiosResponse<Book>>(
      `/books/${id}`,
      rest,
    );
    return data;
  }
}
