import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { CreateBoardGameUseCase } from "../usecases/CreateBoardGameUseCase";

const boardGameSchema = z.object({
  title: z.string().min(3, "O titulo precisa ter no minimo 3 letras"),
  publisher: z
    .string()
    .min(3, "A distribuidora precisa ter no minimo 3 letras"),
  minPlayers: z
    .number()
    .positive("O numero minimo de jogadores precisa ser maior que 0"),
  maxPlayers: z
    .number()
    .positive("O numero maximo de jogadores precisar ser maior que 0"),
  price: z.number().positive("O preço precisa ser maior que 0"),
});

type BoardGameFormData = z.infer<typeof boardGameSchema>;

export function NewBoardGamePage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardGameFormData>({ resolver: zodResolver(boardGameSchema) });

  async function handleCreateBoardGame(data: BoardGameFormData) {
    try {
      await new CreateBoardGameUseCase().handle(data);
      navigate("/");
    } catch (error) {
      console.log("Error to create game", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateBoardGame)}>
        <input {...register("title")} placeholder="Nome do jogo" />
        {errors.title && <p>{errors.title.message}</p>}
        <input
          {...register("publisher")}
          placeholder="Nome da distribuidora "
        />
        {errors.publisher && <p>{errors.publisher.message}</p>}
        <input
          type="number"
          {...register("minPlayers", { valueAsNumber: true })}
          placeholder="Numero minimo de jogadores"
        />
        {errors.minPlayers && <p>{errors.minPlayers.message}</p>}
        <input
          type="number"
          {...register("maxPlayers", { valueAsNumber: true })}
          placeholder="Numero maximo de jogadores"
        />
        {errors.maxPlayers && <p>{errors.maxPlayers.message}</p>}
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          placeholder="Preco do jogo"
        />
        {errors.price && <p>{errors.price.message}</p>}
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}
