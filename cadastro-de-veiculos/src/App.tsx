import { useEffect, useState, type FormEvent } from "react";
import "./App.css";
// import { criaVeiculo } from "./api/cadastraVeiculosApi"; CREATE
import type { Veiculo } from "./types/Veiculo";
import { buscaVeiculos } from "./api/buscaVeiculosApi";
import { atualizaVeiculo } from "./api/atualizaVeiculoApi";

function App() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]); // CREATE/READ
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [placaAtualizada, setPlacaAtualizada] = useState("");

  useEffect(() => {
    let cancelado = false;

    async function buscarVeiculos() {
      try {
        setErro(null);
        const data = await buscaVeiculos();
        if (!cancelado) {
          setVeiculos(data);
        }
      } catch (error) {
        console.log("Erro ao buscar veículos: ", error);
        if (!cancelado) {
          setErro("Erro ao buscar veículos");
        }
      } finally {
        if (!cancelado) {
          setCarregando(false);
        }
      }
    }

    buscarVeiculos();

    return () => {
      cancelado = true;
    };
  }, []);

  function handleIniciarEdicao(veiculo: Veiculo) {
    setEditandoId(veiculo.id);
    setPlacaAtualizada(veiculo.placa);
  }

  function handleCancelarEdicao() {
    setEditandoId(null);
    setPlacaAtualizada("");
  }

  async function handleSalvarEdicao(id: string) {
    if (placaAtualizada.trim() === "") return;

    try {
      const veiculoAtualizado = await atualizaVeiculo(id, placaAtualizada);
      setVeiculos((veiculosAtuais) =>
        veiculosAtuais.map((v) => (v.id === id ? veiculoAtualizado : v)),
      );
      setEditandoId(null);
    } catch (error) {
      console.log("Erro ao atualizar veículo", error);
    }
  }

  // CREATE
  //<-------------------------------------------------------->
  // const [placa, setPlaca] = useState("");
  // const [modelo, setModelo] = useState("");
  // const [ano, setAno] = useState("");

  // CREATE

  // async function handleCriaVeiculo(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();

  //   if (placa.trim() === "" || modelo.trim() === "" || ano === "") return;

  //   const anoNumero = Number(ano);

  //   try {
  //     const novoVeiculo = await criaVeiculo(placa, modelo, anoNumero);
  //     setVeiculos((veiculosAtuais) => [...veiculosAtuais, novoVeiculo]);
  //     setPlaca("");
  //     setModelo("");
  //     setAno("");
  //   } catch (error) {
  //     console.error("Erro ao cadastrar veiculo:", error);
  //   }
  // }
  // <-------------------------------------------------------->

  return (
    <div>
      {erro && <p>Erro ao carregar veiculos: {erro}</p>}
      {carregando && <p>Carregando veiculos</p>}
      {!carregando && !erro && veiculos.length === 0 && (
        <p>Não há veiculos em nossa base.</p>
      )}
      {veiculos.length > 0 &&
        veiculos.map((v) => (
          <div
            key={v.id}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              {editandoId === v.id ? (
                <>
                  <button onClick={handleCancelarEdicao}>Cancelar</button>
                  <button onClick={() => handleSalvarEdicao(v.id)}>
                    Salvar
                  </button>
                  <input
                    value={placaAtualizada}
                    onChange={(e) => setPlacaAtualizada(e.target.value)}
                    placeholder="Nova placa"
                  />
                </>
              ) : (
                <>
                  <button onClick={() => handleIniciarEdicao(v)}>Editar</button>
                  <p>Placa do carro: {v.placa}</p>
                </>
              )}
              <p>Modelo do carro: {v.modelo}</p>
              <p>Ano do carro: {v.ano}</p>
            </div>
          </div>
        ))}
    </div>
    // CREATE
    // <-------------------------------------------------------->
    // <div style={{ display: "flex", flexDirection: "column" }}>
    //   <form onSubmit={handleCriaVeiculo}>
    //     <input
    //       value={placa}
    //       onChange={(e) => setPlaca(e.target.value)}
    //       placeholder="Digite a placa"
    //     />
    //     <input
    //       value={modelo}
    //       onChange={(e) => setModelo(e.target.value)}
    //       placeholder="Digite o modelo"
    //     />
    //     <input
    //       value={ano}
    //       onChange={(e) => setAno(e.target.value)}
    //       placeholder="Digite o ano"
    //     />
    //     <button type="submit">Cadastrar</button>
    //   </form>
    //   {veiculos.length > 0 &&
    //     veiculos.map((v) => (
    //       <div
    //         key={v.id}
    //         style={{
    //           display: "flex",
    //           flexDirection: "row",
    //           justifyContent: "center",
    //           gap: "12px",
    //           marginTop: "12px",
    //         }}
    //       >
    //         <p>Placa do carro: {v.placa}</p>
    //         <p>Modelo do carro: {v.modelo}</p>
    //         <p>Ano do carro: {v.ano}</p>
    //       </div>
    //     ))}
    // </div>
    // <-------------------------------------------------------->
  );
}

export default App;
