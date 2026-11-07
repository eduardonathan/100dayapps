import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { CreateSneakerUseCase } from "../usecases/CreateSneakerUseCase";

const sneakerSchema = z.object({
  model: z.string().min(3, "O modelo do tênis precisa ter ao menos 3 letras."),
  brand: z.string().min(3, "A marca do tênis precisa ter ao menos 3 letras."),
  size: z.number().positive("O tamanho do tênis precisa ser maior que 0."),
  releaseYear: z
    .number()
    .positive("O ano de lançamento precisa ser maior que 0."),
  price: z.number().positive("O preço precisa ser maior do que 0."),
});

type SneakerFormData = z.infer<typeof sneakerSchema>;

export function NewSneakerPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SneakerFormData>({ resolver: zodResolver(sneakerSchema) });

  async function handleCreateSneaker(data: SneakerFormData) {
    try {
      await new CreateSneakerUseCase().handle(data);
      navigate("/");
    } catch (error) {
      console.log("Error to create sneaker", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateSneaker)}>
        <input {...register("model")} placeholder="Modelo do tênis" />
        {errors.model && <p>{errors.model.message}</p>}
        <input {...register("brand")} placeholder="Marca do tênis" />
        {errors.brand && <p>{errors.brand.message}</p>}
        <input
          type="number"
          {...register("size", { valueAsNumber: true })}
          placeholder="Tamanho do tênis"
        />
        {errors.size && <p>{errors.size.message}</p>}
        <input
          type="number"
          {...register("releaseYear", { valueAsNumber: true })}
          placeholder="Ano de lançamento do tênis"
        />
        {errors.releaseYear && <p>{errors.releaseYear.message}</p>}
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          placeholder="Preço do tênis"
        />
        {errors.price && <p>{errors.price.message}</p>}
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}
