import { CreateEquipmentUseCase } from "../api/CreateEquipmentUseCase";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const equipmentSchema = z.object({
  name: z.string().min(3, "Nome do equipamento dever ter no mínimo 3 letras."),
  weight: z.number().positive("O peso deve ser maior que 0"),
  category: z
    .string()
    .min(3, "Categoria do equipamento deve ter no mínimo 3 letras."),
});

type EquipmentFormData = z.infer<typeof equipmentSchema>;

export function NewEquipmentPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EquipmentFormData>({ resolver: zodResolver(equipmentSchema) });

  async function handleCreateEquipment(data: EquipmentFormData) {
    event.preventDefault();

    try {
      await new CreateEquipmentUseCase().handle(data);
      navigate("/");
    } catch (error) {
      console.log("Error to create equipment", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateEquipment)}>
        <input {...register("name")} placeholder="Nome do equipamento" />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          {...register("category")}
          placeholder="Categoria do equipamento"
        />
        {errors.category && <p>{errors.category.message}</p>}
        <input
          {...register("weight", { valueAsNumber: true })}
          placeholder="Peso"
        />
        {errors.weight && <p>{errors.weight.message}</p>}
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}
