import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import { GetSkateboardByIdUseCase } from "../usecases/GetSkateboardByIdUseCase";
import { UpdateSkateboardUseCase } from "../usecases/UpdateSkateboardUseCase";

const skateSchema = z.object({
  model: z.string().min(3, "Modelo do skate precisa ter no minimo 3 letras."),
  brand: z.string().min(3, "Marca do skate precisa ter no minimo 3 letras."),
  lengthCm: z.number().positive("O tamanho precisa ser maior que zero."),
  price: z.number().positive("O preço precisa ser maior que zero."),
});

type SkateFormData = z.infer<typeof skateSchema>;

export function EditSkateboardPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkateFormData>({ resolver: zodResolver(skateSchema) });

  useEffect(() => {
    if (!id) return;
    let canceled = false;

    async function getSkateById() {
      try {
        const data = await new GetSkateboardByIdUseCase().handle(id);
        if (!canceled) {
          reset(data);
        }
      } catch (error) {
        console.log("Error to get skateboard", error);
      }
    }

    getSkateById();

    return () => {
      canceled = true;
    };
  }, [id]);

  async function handleUpdateSkate(data: SkateFormData) {
    if (!id) return;

    try {
      await new UpdateSkateboardUseCase().handle({ id, ...data });
      navigate("/");
    } catch (error) {
      console.log("Error to update skate", error);
    }
  }

  return (
    <div>
      <h1>Skate {id}</h1>
      <form onSubmit={handleSubmit(handleUpdateSkate)}>
        <input {...register("model")} placeholder="Modelo do skate" />
        {errors.model && <p>{errors.model.message}</p>}
        <input {...register("brand")} placeholder="Marca do skate" />
        {errors.brand && <p>{errors.brand.message}</p>}
        <input
          type="number"
          {...register("lengthCm", { valueAsNumber: true })}
          placeholder="Tamanho do skate"
        />
        {errors.lengthCm && <p>{errors.lengthCm.message}</p>}
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          placeholder="Preço do skate"
        />
        {errors.price && <p>{errors.price.message}</p>}
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
}
