import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { CreateSkateboardUseCase } from "../usecases/CreateSkateboardUseCase";

const skateboardSchema = z.object({
  model: z.string().min(3, "O modelo deve ter no mínimo 3 letras"),
  brand: z.string().min(3, "A marca deve ter no mínimo 3 letras"),
  lengthCm: z.number().positive("O comprimento deve ser maior que 0"),
  price: z.number().positive("O preço deve ser maior que 0"),
});

type SkateboardFormData = z.infer<typeof skateboardSchema>;

export function NewSkateboardPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SkateboardFormData>({ resolver: zodResolver(skateboardSchema) });

  async function handleCreateSkateboard(data: SkateboardFormData) {
    try {
      await new CreateSkateboardUseCase().handle(data);
      navigate("/");
    } catch (error) {
      console.log("Error to create skateboard", error);
    }
  }

  return (
    <div>
      <Link to="/">Voltar</Link>
      <h1>Novo skate</h1>
      <form onSubmit={handleSubmit(handleCreateSkateboard)}>
        <input {...register("model")} placeholder="Modelo" />
        {errors.model && <p>{errors.model.message}</p>}

        <input {...register("brand")} placeholder="Marca" />
        {errors.brand && <p>{errors.brand.message}</p>}

        <input
          type="number"
          step="0.1"
          {...register("lengthCm", { valueAsNumber: true })}
          placeholder="Comprimento (cm)"
        />
        {errors.lengthCm && <p>{errors.lengthCm.message}</p>}

        <input
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          placeholder="Preço"
        />
        {errors.price && <p>{errors.price.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          Criar
        </button>
      </form>
    </div>
  );
}
