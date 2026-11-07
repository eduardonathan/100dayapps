import { api } from "../api/axiosInstance";
import type { Skateboard, CreateSkateboardInput } from "../types/Skateboard";

export class CreateSkateboardUseCase {
  private api = api;

  async handle(input: CreateSkateboardInput) {
    const response = await this.api.post<Skateboard>("/skateboards", input);
    return response.data;
  }
}
