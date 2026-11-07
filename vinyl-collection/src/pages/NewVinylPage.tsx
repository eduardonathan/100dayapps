import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { CreateVinylUseCase } from "../api/CreateVinylUseCase";

// - 1 sempre que for criar um formulario primeiro cria o schema
const vinylSchema = z.object({
  title: z.string().min(3, "O titulo do vinil deve ter no minimo 3 letras"),
  artist: z
    .string()
    .min(3, "O Nome do artista do vinil deve ter no minimo 3 letras"),
  year: z.number().positive("O ano não pode ser menor que 0"),
  genre: z.string().min(3, "O genero do vinil deve ter no minimo 3 letras"),
  price: z.number().positive("O preço do vinil não pode ser menor que 0"),
});

// 2 - inferimos o tipo do schema para o TS nao reclamar
type VinylFormData = z.infer<typeof vinylSchema>;

export function NewVinylPage() {
  const navigate = useNavigate();

  // 3 - pegamos register, handlesubmit e erros do hook useform, passamos nosso schema e no resolver tambem nosso schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VinylFormData>({ resolver: zodResolver(vinylSchema) });

  // 4 - aqui ja criamos a funcao que vai criar o vinil, passamos como parametro VinylFormData, que ja vem resolvido e tipado
  async function handleCreateVinyl(data: VinylFormData) {
    try {
      await new CreateVinylUseCase().handle(data); // 4.1 <- ai nao precisamos passar mais os usestates aqui, title, artits etc.
      navigate("/");
    } catch (error) {
      console.log("Error to create vinyl", error);
    }
  }

  return (
    <div>
      {/* aqui ja usamos um dos metodos vindos do hook useform e passando nossa funcao */}
      <form onSubmit={handleSubmit(handleCreateVinyl)}>
        {/* e aqui passamos mais um que é o register, que controla nossos campos do schema*/}
        <input {...register("title")} placeholder="Titulo do vinil" />
        {/* aqui passamos o erro caso aconteca algum*/}
        {errors.title && <p>{errors.title.message}</p>}
        <input {...register("artist")} placeholder="Nome do artista" />
        {errors.artist && <p>{errors.artist.message}</p>}
        {/* valueAsNumber: inputs sempre devolvem string, isso converte para number antes do zod validar */}
        <input
          type="number"
          {...register("year", { valueAsNumber: true })}
          placeholder="Ano de lancamento do vinil"
        />
        {errors.year && <p>{errors.year.message}</p>}
        <input {...register("genre")} placeholder="Genero do vinil" />
        {errors.genre && <p>{errors.genre.message}</p>}
        <input
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          placeholder="Preco do vinil"
        />
        {errors.price && <p>{errors.price.message}</p>}
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}
