import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { CreatePerfumeUseCase } from "../usecases/CreatePerfumeUseCase";

const perfumeSchema = z.object({
  name: z.string().min(3, "O nome do perfume precisa ter ao menos 3 letras."),
  brand: z.string().min(3, "A marca do perfume precisa ter ao menos 3 letras."),
  volumeMl: z.number().positive("O ML do frasco deve ser maior que 0."),
  launchYear: z
    .number()
    .positive("O ano de lançamento precisa ser maior que 0."),
  price: z.number().positive("O preço do perfume precisa ser maior que 0."),
});

type PerfumeFormData = z.infer<typeof perfumeSchema>;

export function NewPerfumePage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PerfumeFormData>({ resolver: zodResolver(perfumeSchema) });

  async function handleCreatePerfume(data: PerfumeFormData) {
    try {
      await new CreatePerfumeUseCase().handle(data);
      navigate("/");
    } catch (error) {
      console.log("Error to create perfume.", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreatePerfume)}>
        <input {...register("name")} placeholder="Nome do perfume" />
        {errors.name && <p>{errors.name.message}</p>}
        <input {...register("brand")} placeholder="Marca do perfume" />
        {errors.brand && <p>{errors.brand.message}</p>}
        <input
          type="number"
          {...register("volumeMl", { valueAsNumber: true })}
          placeholder="Quantidade em ML de perfume."
        />
        {errors.volumeMl && <p>{errors.volumeMl.message}</p>}
        <input
          type="number"
          {...register("launchYear", { valueAsNumber: true })}
          placeholder="Ano de lançamento do perfume"
        />
        {errors.launchYear && <p>{errors.launchYear.message}</p>}
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          placeholder="Valor do perfume."
        />
        {errors.price && <p>{errors.price.message}</p>}
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}
