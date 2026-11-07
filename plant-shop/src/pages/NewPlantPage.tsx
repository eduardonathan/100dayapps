import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { CreatePlantUseCase } from "../usecases/CreatePlantUseCase";

const plantSchema = z.object({
  name: z.string().min(3, "O nome da planta deve ter no mínimo 3 letras"),
  species: z.string().min(3, "A espécie deve ter no mínimo 3 letras"),
  waterFrequencyDays: z
    .number()
    .int("A frequência deve ser um número inteiro de dias")
    .positive("A frequência de rega deve ser maior que 0"),
  price: z.number().positive("O preço deve ser maior que 0"),
});

type PlantFormData = z.infer<typeof plantSchema>;

export function NewPlantPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PlantFormData>({ resolver: zodResolver(plantSchema) });

  async function handleCreatePlant(data: PlantFormData) {
    try {
      await new CreatePlantUseCase().handle(data);
      navigate("/");
    } catch (error) {
      console.log("Error to create plant", error);
    }
  }

  return (
    <div>
      <Link to="/">Voltar</Link>
      <h1>Nova planta</h1>
      <form onSubmit={handleSubmit(handleCreatePlant)}>
        <input {...register("name")} placeholder="Nome popular" />
        {errors.name && <p>{errors.name.message}</p>}

        <input {...register("species")} placeholder="Espécie (nome científico)" />
        {errors.species && <p>{errors.species.message}</p>}

        <input
          type="number"
          {...register("waterFrequencyDays", { valueAsNumber: true })}
          placeholder="Regar a cada quantos dias"
        />
        {errors.waterFrequencyDays && (
          <p>{errors.waterFrequencyDays.message}</p>
        )}

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
