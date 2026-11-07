import type { AxiosResponse } from "axios";
import type { Adoption } from "../types/Adoption";
import { api } from "./axiosInstance";

interface AdoptionInputProps {
  petName: string;
  species: string;
  age: number;
  status: string;
}

export class CreateAdoptionUseCase {
  private api = api;

  async handle(props: AdoptionInputProps) {
    const { data } = await this.api.post<unknown, AxiosResponse<Adoption>>(
      `/adoptions`,
      props,
    );
    return data;
  }
}
