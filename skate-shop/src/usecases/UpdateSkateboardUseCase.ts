import { api } from "../api/axiosInstance";
import type { Skateboard, UpdateSkateboardInput } from "../types/Skateboard";

export class UpdateSkateboardUseCase {
  private api = api;

  async handle({ id, ...rest }: UpdateSkateboardInput) {
    const response = await this.api.patch<Skateboard>(`/skateboards/${id}`, rest);
    return response.data;
  }
}
