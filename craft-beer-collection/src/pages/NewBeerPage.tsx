import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { CreateBeerUseCase } from "../usecases/CreateBeerUseCase";

const beerSchema = z.object({
  name: z.string().min(3, "O nome da cerveja deve ter no mínimo 3 letras"),
  brewery: z.string().min(3, "O nome da cervejaria deve ter no mínimo 3 letras"),
  style: z.string().min(3, "O estilo da cerveja deve ter no mínimo 3 letras"),
  abv: z.number().positive("O teor alcoólico deve ser maior que 0"),
  price: z.number().positive("O preço deve ser maior que 0"),
});

type BeerFormData = z.infer<typeof beerSchema>;

export function NewBeerPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BeerFormData>({ resolver: zodResolver(beerSchema) });

  async function handleCreateBeer(data: BeerFormData) {
    try {
      await new CreateBeerUseCase().handle(data);
      navigate("/");
    } catch (error) {
      console.log("Error to create beer", error);
    }
  }

  return (
    <div>
      <Link to="/">Voltar</Link>
      <h1>Nova cerveja</h1>
      <form onSubmit={handleSubmit(handleCreateBeer)}>
        <input {...register("name")} placeholder="Nome da cerveja" />
        {errors.name && <p>{errors.name.message}</p>}

        <input {...register("brewery")} placeholder="Cervejaria" />
        {errors.brewery && <p>{errors.brewery.message}</p>}

        <input {...register("style")} placeholder="Estilo (ex: IPA)" />
        {errors.style && <p>{errors.style.message}</p>}

        <input
          type="number"
          step="0.1"
          {...register("abv", { valueAsNumber: true })}
          placeholder="Teor alcoólico (%)"
        />
        {errors.abv && <p>{errors.abv.message}</p>}

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
