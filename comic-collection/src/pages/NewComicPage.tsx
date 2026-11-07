import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { CreateComicUseCase } from "../usecases/CreateComicUseCase";

const comicSchema = z.object({
  title: z
    .string()
    .min(3, "O titulo do quadrinho precisa ter no minimo 3 letras."),
  author: z
    .string()
    .min(3, "O nome do autor do quadrinho precisa ter no minimo 3 letras."),
  publisher: z
    .string()
    .min(3, "A publicadora do quadrinho precisa ter no minimo 3 letras."),
  year: z.number().positive("O ano de lancamento deve ser ser maior que 0."),
  price: z.number().positive("O preço precisa ser maior que 0."),
});

type ComicFormData = z.infer<typeof comicSchema>;

export function NewComicPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ComicFormData>({ resolver: zodResolver(comicSchema) });

  async function handleCreateComic(data: ComicFormData) {
    try {
      await new CreateComicUseCase().handle(data);
      navigate("/");
    } catch (error) {
      console.log("Error to create comic", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateComic)}>
        <input {...register("title")} placeholder="Titulo do quadrinho" />
        {errors.title && <p>{errors.title.message}</p>}
        <input
          {...register("author")}
          placeholder="Nome do autor do quadrinho"
        />
        {errors.author && <p>{errors.author.message}</p>}
        <input {...register("publisher")} placeholder="Distribuidora" />
        {errors.publisher && <p>{errors.publisher.message}</p>}
        <input
          type="number"
          {...register("year", { valueAsNumber: true })}
          placeholder="Ano de lançamento do quadrinho"
        />
        {errors.year && <p>{errors.year.message}</p>}
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          placeholder="Preço do quadrinho"
        />
        {errors.price && <p>{errors.price.message}</p>}
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}
