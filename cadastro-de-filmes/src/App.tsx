import { useEffect, useState, type FormEvent } from "react";
import "./App.css";
import type { Filme } from "./types/Filme";
import { criaFilme } from "./api/createFilmeApi";
import { buscaFilmes } from "./api/buscaFilmesApi";
import { atualizaFilme } from "./api/updateFilmeApi";

function App() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [tituloEditado, setTituloEditado] = useState("");

  useEffect(() => {
    let cancelado = false;

    async function buscarFilmes() {
      try {
        setErro(null);
        const data = await buscaFilmes();
        if (!cancelado) {
          setFilmes(data);
        }
      } catch (error) {
        console.log("Erro ao buscar filmes:", error);
        if (!cancelado) {
          setErro("Erro ao buscar filmes");
        }
      } finally {
        if (!cancelado) {
          setCarregando(false);
        }
      }
    }

    buscarFilmes();

    return () => {
      cancelado = true;
    };
  }, []);

  function handleIniciarEdicao(filme: Filme) {
    setEditandoId(filme.id);
    setTituloEditado(filme.titulo);
  }

  function handleCancelarEdicao() {
    setEditandoId(null);
    setTituloEditado("");
  }

  async function handleSalvarEdicao(id: string) {
    if (tituloEditado.trim() === "") return;

    try {
      const tituloAtualizado = await atualizaFilme(id, tituloEditado);
      setFilmes((filmesAtuais) =>
        filmesAtuais.map((f) => (f.id === id ? tituloAtualizado : f)),
      );
      setEditandoId(null);
    } catch (error) {
      console.log("Erro ao atualizar filme", error);
    }
  }

  // const [titulo, setTitulo] = useState("");
  // const [genero, setGenero] = useState("");
  // const [duracaoMinutos, setDuracaoMinutos] = useState("");

  // async function handleCriarFilme(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();

  //   if (titulo.trim() === "" || genero.trim() === "" || duracaoMinutos === "")
  //     return;

  //   const duracaoMinutosNumero = Number(duracaoMinutos);

  //   try {
  //     const novoFilme = await criaFilme(titulo, genero, duracaoMinutosNumero);
  //     setFilmes((filmesAtuais) => [...filmesAtuais, novoFilme]);
  //     setTitulo("");
  //     setGenero("");
  //     setDuracaoMinutos("");
  //   } catch (error) {
  //     console.error("Erro ao cadastrar filme:", error);
  //   }
  // }

  return (
    <div>
      {/* <form onSubmit={handleCriarFilme}>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Digite o titulo do filme"
        />
        <input
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          placeholder="Digite o genero do filme"
        />
        <input
          value={duracaoMinutos}
          onChange={(e) => setDuracaoMinutos(e.target.value)}
          placeholder="Digite a duração do filme"
        />
        <button type="submit">Cadastrar</button>
      </form>
      {filmes.length > 0 &&
        filmes.map((f) => (
          <div
            key={f.id}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              margin: "32px",
              gap: "18px",
            }}
          >
            <p>Titulo do filme: {f.titulo}</p>
            <p>Genero do filme: {f.genero}</p>
            <p>Duração do filme: {f.duracaoMinutos}</p>
          </div>
        ))} */}
      {erro && <p>Erro ao buscar filmes...</p>}
      {carregando && <p>Carregando filmes...</p>}
      {!carregando && !erro && filmes.length === 0 && (
        <p>Não há filmes em nossa base...</p>
      )}
      {filmes.length > 0 &&
        filmes.map((f) => (
          <div
            key={f.id}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              margin: "32px",
              gap: "18px",
            }}
          >
            {editandoId === f.id ? (
              <>
                <input
                  value={tituloEditado}
                  onChange={(e) => setTituloEditado(e.target.value)}
                />
                <button onClick={() => handleSalvarEdicao(f.id)}>Salvar</button>
                <button onClick={handleCancelarEdicao}>Cancelar</button>
              </>
            ) : (
              <>
                <span>{f.titulo}</span>
                <button onClick={() => handleIniciarEdicao(f)}>Editar</button>
              </>
            )}
            <p>Titulo do filme: {f.titulo}</p>
            <p>Genero do filme: {f.genero}</p>
            <p>Duração do filme: {f.duracaoMinutos}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
