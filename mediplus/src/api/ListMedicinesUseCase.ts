import type { AxiosResponse } from "axios";
import { api } from "./axiosInstance";
import type { Medicine } from "../types/Medicine";

export class ListMedicinesUseCase {
  private api = api;

  async handle() {
    const { data } = await this.api.get<unknown, AxiosResponse<Medicine[]>>(
      `/medicines`,
    );
    return data;
  }
}
