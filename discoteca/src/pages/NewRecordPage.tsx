import { useState, type FormEvent } from "react";
import { CreateRecordUseCase } from "../api/CreateRecordUseCase";
import { useNavigate, Link } from "react-router-dom";
import { PageShell } from "../components/PageShell";

export function NewRecordPage() {
  const [albumTitle, setAlbumTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("novo");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  async function handleCreateRecord(event: FormEvent) {
    event.preventDefault();

    if (
      albumTitle.trim() === "" ||
      artist.trim() === "" ||
      year.trim() === "" ||
      status.trim() === ""
    )
      return;

    try {
      setSubmitting(true);
      await new CreateRecordUseCase().handle({
        albumTitle,
        artist,
        year: Number(year),
        status,
      });
      navigate("/");
    } catch (error) {
      console.log("Error to create record", error);
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
          <h1 className="form-title">Mais um disco na coleção</h1>
          <p className="hero-subtitle">
            Preencha os dados abaixo pra colocar esse álbum no catálogo.
          </p>

          <form onSubmit={handleCreateRecord} className="form-grid">
            <label className="field">
              <span>Título do álbum</span>
              <input
                value={albumTitle}
                onChange={(e) => setAlbumTitle(e.target.value)}
                placeholder="Ex: Aja"
              />
            </label>
            <label className="field">
              <span>Artista</span>
              <input
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Ex: Steely Dan"
              />
            </label>
            <label className="field">
              <span>Ano</span>
              <input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Ex: 1977"
                inputMode="numeric"
              />
            </label>
            <label className="field">
              <span>Estado</span>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="novo">Novo</option>
                <option value="usado">Usado</option>
                <option value="riscado">Riscado</option>
              </select>
            </label>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={submitting}
            >
              {submitting ? "Cadastrando..." : "Criar disco"}
            </button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}
