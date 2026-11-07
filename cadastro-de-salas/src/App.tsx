import { useEffect, useState, type FormEvent } from "react";
import "./App.css";
import type { Sala } from "./types/Sala";
import { criaSala } from "./api/createSalaApi";
import { fetchSalas } from "./api/fetchSalasApi";
import { atualizaSala } from "./api/updateSalaApi";

function App() {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [andarAtualizado, setAndarAtualizado] = useState("");

  // const [nome, setNome] = useState("");
  // const [andar, setAndar] = useState("");
  // const [capacidade, setCapacidade] = useState("");

  useEffect(() => {
    let cancelado = false;

    async function buscaSalas() {
      try {
        setErro(null);
        const data = await fetchSalas();
        if (!cancelado) {
          setSalas(data);
        }
      } catch (error) {
        console.log("Erro ao buscar salas.", error);
        if (!cancelado) {
          setErro("Erro ao buscar salas");
        }
      } finally {
        if (!cancelado) {
          setCarregando(false);
        }
      }
    }

    buscaSalas();

    return () => {
      cancelado = true;
    };
  }, []);

  function handleIniciarEdicao(sala: Sala) {
    setEditandoId(sala.id);
    setAndarAtualizado(sala.andar);
  }

  function handleCancelarEdicao() {
    setEditandoId(null);
    setAndarAtualizado("");
  }

  async function handleAtualizaSala(id: string) {
    if (andarAtualizado.trim() === "") return;

    try {
      const salaAtualizada = await atualizaSala(id, andarAtualizado);
      setSalas((salasAtuais) =>
        salasAtuais.map((s) => (s.id === id ? salaAtualizada : s)),
      );
      setEditandoId(null);
    } catch (error) {
      console.log("Erro ao atualizar sala", error);
    }
  }

  // async function handleCriarSala(event: FormEvent) {
  //   event.preventDefault();

  //   if (nome.trim() === "" || andar.trim() === "" || capacidade.trim() === "")
  //     return;

  //   const capacidadeNumero = Number(capacidade);

  //   try {
  //     const novaSala = await criaSala(nome, capacidadeNumero, andar);
  //     setSalas((salasAtuais) => [...salasAtuais, novaSala]);
  //     setNome("");
  //     setCapacidade("");
  //     setAndar("");
  //   } catch (error) {
  //     console.log("Erro ao criar sala.", error);
  //   }
  // }

  return (
    <div>
      <h1>SALAS DE REUNIÃO</h1>
      {erro && <p>Erro ao carregar salas...</p>}
      {carregando && <p>Carregando salas...</p>}
      {!carregando && !erro && salas.length === 0 && <p>Não há salas...</p>}
      {salas.length > 0 &&
        salas.map((s) => (
          <div
            key={s.id}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <p>Sala: {s.nome}</p>
            <p>Capacidade: {s.capacidade}</p>
            {editandoId === s.id ? (
              <>
                <p>Andar:</p>
                <input
                  value={andarAtualizado}
                  onChange={(e) => setAndarAtualizado(e.target.value)}
                />
                <button onClick={() => handleAtualizaSala(s.id)}>Salvar</button>
                <button onClick={handleCancelarEdicao}>Cancelar</button>
              </>
            ) : (
              <>
                <p>Andar: {s.andar}</p>
                <button onClick={() => handleIniciarEdicao(s)}>Editar</button>
              </>
            )}
          </div>
        ))}
      {/* <form onSubmit={handleCriarSala}>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite a nome da sala"
        />
        <input
          value={capacidade}
          onChange={(e) => setCapacidade(e.target.value)}
          placeholder="Digite a capacidade da sala"
        />
        <input
          value={andar}
          onChange={(e) => setAndar(e.target.value)}
          placeholder="Digite o andar da sala"
        />
        <button type="submit">Cadastrar</button>
      </form>
      {salas.length > 0 &&
        salas.map((s) => (
          <div
            key={s.id}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <p>Sala: {s.nome}</p>
            <p>Capacidade: {s.capacidade}</p>
            <p>Andar: {s.andar}</p>
          </div>
        ))} */}
    </div>
  );
}

export default App;
