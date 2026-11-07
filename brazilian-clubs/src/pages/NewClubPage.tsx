import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { CreateClubUseCase } from "../usecases/CreateClubUseCase";

const clubSchema = z.object({
  name: z.string().min(3, "O nome do clube deve ter no mínimo 3 letras"),
  city: z.string().min(3, "A cidade deve ter no mínimo 3 letras"),
  state: z.string().min(2, "O estado deve ter no mínimo 2 letras"),
  foundedYear: z.number().positive("O ano de fundação deve ser maior que 0"),
  titles: z.number().positive("O número de títulos deve ser maior que 0"),
});

type ClubFormData = z.infer<typeof clubSchema>;

export function NewClubPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClubFormData>({ resolver: zodResolver(clubSchema) });

  async function handleCreateClub(data: ClubFormData) {
    try {
      await new CreateClubUseCase().handle(data);
      navigate("/");
    } catch (error) {
      console.log("Error to create club", error);
    }
  }

  return (
    <div>
      <Link to="/">Voltar</Link>
      <h1>Novo clube</h1>
      <form onSubmit={handleSubmit(handleCreateClub)}>
        <input {...register("name")} placeholder="Nome do clube" />
        {errors.name && <p>{errors.name.message}</p>}

        <input {...register("city")} placeholder="Cidade" />
        {errors.city && <p>{errors.city.message}</p>}

        <input {...register("state")} placeholder="Estado (ex: SP)" />
        {errors.state && <p>{errors.state.message}</p>}

        <input
          type="number"
          {...register("foundedYear", { valueAsNumber: true })}
          placeholder="Ano de fundação"
        />
        {errors.foundedYear && <p>{errors.foundedYear.message}</p>}

        <input
          type="number"
          {...register("titles", { valueAsNumber: true })}
          placeholder="Títulos"
        />
        {errors.titles && <p>{errors.titles.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          Criar
        </button>
      </form>
    </div>
  );
}
