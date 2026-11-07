import { useEffect, useState, type FormEvent } from "react";
import "./App.css";
import type { Reserva } from "./types/Reserva";
import { criaReserva } from "./api/createReservaApi";
import { buscaReservas } from "./api/fetchReservasApi";

function App() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  // const [hospede, setHospede] = useState("");
  // const [quarto, setQuarto] = useState("");
  // const [noites, setNoites] = useState("");

  // async function handleCriarReserva(event: FormEvent) {
  //   event.preventDefault();

  //   if (hospede.trim() === "" || quarto.trim() === "" || noites.trim() === "")
  //     return;
  //   try {
  //     const noitesNumero = Number(noites);
  //     const novaReserva = await criaReserva(hospede, quarto, noitesNumero);
  //     setReservas((reservasAtuais) => [...reservasAtuais, novaReserva]);
  //     setHospede("");
  //     setQuarto("");
  //     setNoites("");
  //   } catch (error) {
  //     console.log("Erro ao criar reserva", error);
  //   }
  // }

  useEffect(() => {
    let cancelado = false;

    async function buscarReservas() {
      try {
        setErro(null);
        const data = await buscaReservas();
        if (!cancelado) {
          setReservas(data);
        }
      } catch (error) {
        console.log("Erro ao buscar as reservas", error);
        if (!cancelado) {
          setErro("Erro ao buscar as reservas");
        }
      } finally {
        if (!cancelado) {
          setCarregando(false);
        }
      }
    }

    buscarReservas();

    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <div>
      <h1>Lista de reservas:</h1>
      {/* <form onSubmit={handleCriarReserva}>
        <input
          value={hospede}
          onChange={(e) => setHospede(e.target.value)}
          placeholder="Nome do hospede"
        />
        <input
          value={quarto}
          onChange={(e) => setQuarto(e.target.value)}
          placeholder="Numero do quarto"
        />
        <input
          value={noites}
          onChange={(e) => setNoites(e.target.value)}
          placeholder="Quantidade de noites"
        />
        <button type="submit">Fazer reserva</button>
      </form> */}
      {erro && <p>Erro ao buscar as reservas...</p>}
      {carregando && <p>Carregando as reservas</p>}
      {!carregando && !erro && reservas.length === 0 && (
        <p>Ainda não há reservas feitas...</p>
      )}
      {reservas.length > 0 &&
        reservas.map((r) => (
          <div
            key={r.id}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "32px",
              gap: "16px",
            }}
          >
            <p>Nome do hospede: {r.hospede}</p>
            <p>Numero do quarto: {r.quarto}</p>
            <p>Noites: {r.noites}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
