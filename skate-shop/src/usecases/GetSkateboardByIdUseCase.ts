import { api } from "../api/axiosInstance";
import type { Skateboard } from "../types/Skateboard";

export class GetSkateboardByIdUseCase {
  private api = api;

  async handle(id: string) {
    const response = await this.api.get<Skateboard>(`/skateboards/${id}`);
    return response.data;
  }
}
