import { useEffect, useState, type FormEvent } from "react";
import "./App.css";
import type { Fornecedor } from "./types/Fornecedor";
import { criaFornecedor } from "./api/createFornecedorApi";
import { buscaFornecedores } from "./api/fetchFornecedoresApi";
import { atualizaFornecedor } from "./api/updateFornecedorApi";
import { deletaFornecedor } from "./api/deleteFornecedorApi";

function App() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [nomeEditado, setNomeEditado] = useState("");

  useEffect(() => {
    let cancelado = false;

    async function buscarFornecedores() {
      try {
        setErro(null);
        const data = await buscaFornecedores();
        if (!cancelado) {
          setFornecedores(data);
        }
      } catch (error) {
        console.log("Erro ao buscar fornecedores.", error);
        if (!cancelado) {
          setErro("Erro ao buscar fornecedores");
        }
      } finally {
        if (!cancelado) {
          setCarregando(false);
        }
      }
    }

    buscarFornecedores();

    return () => {
      cancelado = true;
    };
  }, []);

  function handleIniciarEdicao(fornecedor: Fornecedor) {
    setEditandoId(fornecedor.id);
    setNomeEditado(fornecedor.nome);
  }

  function handleCancelarEdicao() {
    setEditandoId(null);
    setNomeEditado("");
  }

  async function handleSalvarEdicao(id: string) {
    if (nomeEditado.trim() === "") return;

    try {
      const fornecedorAtualizado = await atualizaFornecedor(id, nomeEditado);
      setFornecedores((fornecedoresAtuais) =>
        fornecedoresAtuais.map((f) => (id === f.id ? fornecedorAtualizado : f)),
      );
      setEditandoId(null);
    } catch (error) {
      console.log("Erro ao atualizar fornecedor", error);
    }
  }

  async function handleDeletarFornecedor(id: string) {
    try {
      await deletaFornecedor(id);
      setFornecedores((fornecedoresAtuais) =>
        fornecedoresAtuais.filter((f) => f.id !== id),
      );
    } catch (error) {
      console.log("Erro ao deletar fornecedor", error);
    }
  }

  // const [nome, setNome] = useState("");
  // const [cnpj, setCnpj] = useState("");
  // const [telefone, setTelefone] = useState("");

  // async function handleCriarFornecedor(event: FormEvent) {
  //   event.preventDefault();

  //   if (nome.trim() === "" || cnpj.trim() === "" || telefone.trim() === "")
  //     return;

  //   try {
  //     const novoFornecedor = await criaFornecedor(nome, cnpj, telefone);
  //     setFornecedores((fornecedoresAtuais) => [
  //       ...fornecedoresAtuais,
  //       novoFornecedor,
  //     ]);
  //     setNome("");
  //     setCnpj("");
  //     setTelefone("");
  //   } catch (error) {
  //     console.log("Erro ao criar fornecedor", error);
  //   }
  // }

  return (
    <div>
      <h1>Lista de fornecedores</h1>
      {/* <form onSubmit={handleCriarFornecedor}>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome do fornecedor"
        />
        <input
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          placeholder="Digite o CNPJ do fornecedor"
        />
        <input
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="Digite o telefone do fornecedor"
        />
        <button type="submit">Cadastrar fornecedor</button>
      </form> */}
      {erro && <p>Erro ao buscar fornecedores...</p>}
      {carregando && <p>Carregando lista de fornecedores...</p>}
      {!erro && !carregando && fornecedores.length === 0 && (
        <p>Não há nenhum fornecedor na base de dados...</p>
      )}
      {fornecedores.length > 0 &&
        fornecedores.map((f) => (
          <div
            key={f.id}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              margin: "32px",
              gap: "22px",
            }}
          >
            {editandoId === f.id ? (
              <>
                <input
                  value={nomeEditado}
                  onChange={(e) => setNomeEditado(e.target.value)}
                />
                <button onClick={() => handleSalvarEdicao(f.id)}>Salvar</button>
                <button onClick={handleCancelarEdicao}>Cancelar</button>
              </>
            ) : (
              <>
                <button onClick={() => handleIniciarEdicao(f)}>Editar</button>
                <p>Nome: {f.nome}</p>
              </>
            )}
            <p>CNPJ: {f.cnpj}</p>
            <p>Telefone: {f.telefone}</p>
            <button onClick={() => handleDeletarFornecedor(f.id)}>
              Deletar
            </button>
          </div>
        ))}
    </div>
  );
}

export default App;
