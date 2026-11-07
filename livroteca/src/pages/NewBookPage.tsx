import { useState, type FormEvent } from "react";
import { CreateBookUseCase } from "../api/CreateBookUseCase";
import { useNavigate, Link } from "react-router-dom";
import { PageShell } from "../components/PageShell";

export function NewBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("disponível");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  async function handleCreateBook(event: FormEvent) {
    event.preventDefault();

    if (
      title.trim() === "" ||
      author.trim() === "" ||
      year.trim() === "" ||
      status.trim() === ""
    )
      return;

    const yearNumber = Number(year);

    try {
      setSubmitting(true);
      await new CreateBookUseCase().handle({
        title,
        author,
        year: yearNumber,
        status,
      });
      navigate("/");
    } catch (error) {
      console.log("Error to create book", error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageShell>
      <div className="form-page">
        <Link to="/" className="back-link">
          ← Voltar
        </Link>
        <div className="card form-card">
          <span className="eyebrow">Novo cadastro</span>
          <h1 className="form-title">Mais um livro pra estante</h1>
          <p className="hero-subtitle">
            Preencha os dados abaixo pra colocar esse livro no catálogo.
          </p>

          <form onSubmit={handleCreateBook} className="form-grid">
            <label className="field">
              <span>Título</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Duna"
              />
            </label>
            <label className="field">
              <span>Autor</span>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Ex: Frank Herbert"
              />
            </label>
            <label className="field">
              <span>Ano</span>
              <input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Ex: 1965"
                inputMode="numeric"
              />
            </label>
            <label className="field">
              <span>Status</span>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="disponível">Disponível</option>
                <option value="emprestado">Emprestado</option>
                <option value="atrasado">Atrasado</option>
              </select>
            </label>
            <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
              {submitting ? "Cadastrando..." : "Criar livro"}
            </button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}
