import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import { GetPlantByIdUseCase } from "../usecases/GetPlantByIdUseCase";
import { UpdatePlantUseCase } from "../usecases/UpdatePlantUseCase";

const plantSchema = z.object({
  name: z.string().min(3, "O nome da planta precisa ter 3 caracteres"),
  species: z.string().min(3, "A especie da planta precisa ter 3 caracteres"),
  waterFrequencyDays: z
    .number()
    .positive("O numero de dias precisa ser positivo."),
  price: z.number().positive("O preco da planta precisa ser positivo."),
});

type PlantFormData = z.infer<typeof plantSchema>;

export function EditPlantPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PlantFormData>({ resolver: zodResolver(plantSchema) });

  useEffect(() => {
    if (!id) return;
    let canceled = false;

    async function getPlants() {
      try {
        const data = await new GetPlantByIdUseCase().handle(id);
        if (!canceled) {
          reset(data);
        }
      } catch (error) {
        console.log("Error to fetch plants", error);
      }
    }

    getPlants();

    return () => {
      canceled = true;
    };
  }, [id]);

  async function handleUpdatePlant(data: PlantFormData) {
    if (!id) return;

    try {
      await new UpdatePlantUseCase().handle({ id, ...data });
      navigate("/");
    } catch (error) {
      console.log("Error to update plant", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleUpdatePlant)}>
        <input {...register("name")} placeholder="Nome da planta" />
        {errors.name && <p>{errors.name.message}</p>}
        <input {...register("species")} placeholder="Especie da planta" />
        {errors.species && <p>{errors.species.message}</p>}
        <input
          type="number"
          {...register("waterFrequencyDays", { valueAsNumber: true })}
          placeholder="Dias de regar"
        />
        {errors.waterFrequencyDays && (
          <p>{errors.waterFrequencyDays.message}</p>
        )}
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          placeholder="Preco da planta"
        />
        {errors.price && <p>{errors.price.message}</p>}
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
