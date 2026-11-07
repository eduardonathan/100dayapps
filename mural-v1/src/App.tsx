import { useEffect, useState } from "react";
import { fetchRecados, createRecado, curtirRecado } from "./api/recadosApi";
import { RecadoCard } from "./components/RecadoCard";
import type { Recado } from "./types/Recado";

function App() {
  const [recados, setRecados] = useState<Recado[]>([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    let cancelado = false;

    async function carregarRecados() {
      try {
        const data = await fetchRecados();
        if (!cancelado) {
          setRecados(data);
        }
      } catch (error) {
        console.error("Erro ao buscar recados:", error);
      }
    }

    carregarRecados();

    return () => {
      cancelado = true;
    };
  }, []);

  async function handleCriarRecado() {
    if (texto.trim() === "") return;

    try {
      await createRecado(texto);
      setTexto("");
      const data = await fetchRecados();
      setRecados(data);
    } catch (error) {
      console.error("Erro ao criar recado:", error);
    }
  }

  async function handleCurtir(id: string, novasCurtidas: number) {
    try {
      await curtirRecado({ id, novasCurtidas });
      const data = await fetchRecados();
      setRecados(data);
    } catch (error) {
      console.error("Erro ao curtir recado:", error);
    }
  }

  return (
    <div>
      <h1>Mural de Recados</h1>

      <input value={texto} onChange={(e) => setTexto(e.target.value)} />
      <button onClick={handleCriarRecado}>Postar</button>

      <ul>
        {recados.map((recado) => (
          <RecadoCard key={recado.id} recado={recado} onCurtir={handleCurtir} />
        ))}
      </ul>
    </div>
  );
}

export default App;
