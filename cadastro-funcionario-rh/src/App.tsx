import { useEffect, useState, type FormEvent } from "react";
import "./App.css";
import type { Funcionario } from "./types/Funcionario";
import { handleCreateFuncionario } from "./api/createFuncionarioApi";
import { buscaFuncionarios } from "./api/fetchFuncionarioApi";
import { atualizaFuncionario } from "./api/updateFuncionarioApi";

function App() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [cargoEditado, setCargoEditado] = useState("");

  useEffect(() => {
    let cancelado = false;

    async function buscarFuncionarios() {
      try {
        setErro(null);
        const data = await buscaFuncionarios();
        if (!cancelado) {
          setFuncionarios(data);
        }
      } catch (error) {
        console.log("Erro ao buscar funcionarios", error);
        if (!cancelado) {
          setErro("Erro ao buscar funcionarios");
        }
      } finally {
        if (!cancelado) {
          setCarregando(false);
        }
      }
    }

    buscarFuncionarios();

    return () => {
      cancelado = true;
    };
  }, []);

  function handleIniciarEdicao(funcionario: Funcionario) {
    setEditandoId(funcionario.id);
    setCargoEditado(funcionario.cargo);
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setCargoEditado("");
  }

  async function handleSalvarEdicao(id: string) {
    if (cargoEditado.trim() === "") return;

    try {
      const funcionarioAtualizado = await atualizaFuncionario(id, cargoEditado);
      setFuncionarios((funcionariosAtuais) =>
        funcionariosAtuais.map((f) =>
          f.id === id ? funcionarioAtualizado : f,
        ),
      );
      setEditandoId(null);
    } catch (error) {
      console.log("Erro ao atualizar categoria", error);
    }
  }

  // const [nome, setNome] = useState("");
  // const [cargo, setCargo] = useState("");
  // const [salario, setSalario] = useState("");

  // async function createFuncionario(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();

  //   if (nome.trim() === "" || salario === "" || cargo.trim() === "") return;

  //   const salarioNumero = Number(salario);

  //   try {
  //     const novoFuncionario = await handleCreateFuncionario(
  //       nome,
  //       cargo,
  //       salarioNumero,
  //     );
  //     setFuncionarios((funcionariosAtuais) => [
  //       ...funcionariosAtuais,
  //       novoFuncionario,
  //     ]);
  //     setNome("");
  //     setCargo("");
  //     setSalario("");
  //   } catch (error) {
  //     console.log("Erro ao adicinar funcionario: ", error);
  //   }
  // }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "32px",
      }}
    >
      <h1>Funcionarios</h1>
      {erro && <p>Erro ao buscar usuários</p>}
      {carregando && <p>Carregando usuários</p>}
      {!carregando && !erro && funcionarios.length === 0 && (
        <p>Não há usuários</p>
      )}
      {funcionarios.map((f) => (
        <div key={f.id} style={{ display: "flex", gap: "18px" }}>
          <p>Nome do Funcionario: {f.nome}</p>

          {editandoId === f.id ? (
            <>
              <input
                value={cargoEditado}
                onChange={(e) => setCargoEditado(e.target.value)}
              />
              <button onClick={() => handleSalvarEdicao(f.id)}>Salvar</button>
              <button onClick={cancelarEdicao}>Cancelar</button>
            </>
          ) : (
            <>
              <p>Cargo do Funcionario: {f.cargo}</p>
              <button onClick={() => handleIniciarEdicao(f)}>Editar</button>
            </>
          )}

          <p>Salario do Funcionario: {f.salario}</p>
        </div>
      ))}
      {/* <form onSubmit={createFuncionario}>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome do funcionário"
        />
        <input
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          placeholder="Digite o cargo do funcionário"
        />
        <input
          value={salario}
          onChange={(e) => setSalario(e.target.value)}
          placeholder="Digite o salário do funcionário"
        />
        <button type="submit">Cadastrar</button>
      </form>
      {funcionarios.length > 0 &&
        funcionarios.map((f) => (
          <div key={f.id}>
            <p>Nome do Funcionario: {f.nome}</p>
            <p>Cargo do Funcionario: {f.cargo}</p>
            <p>Salario do Funcionario: {f.salario}</p>
          </div>
        ))} */}
    </div>
  );
}

export default App;
