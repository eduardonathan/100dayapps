import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UpdateRecordUseCase } from "../api/UpdateRecordUseCase";
import { GetRecordByIdUseCase } from "../api/GetRecordByIdUseCase";
import type { VinylRecord } from "../types/Record";
import { PageShell } from "../components/PageShell";
import { statusEmoji } from "../utils/statusEmoji";

export function RecordEditPage() {
  const { id } = useParams();
  const [record, setRecord] = useState<VinylRecord | null>(null);
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function handleSaveEdit(event: FormEvent) {
    event.preventDefault();

    if (!id || year.trim() === "" || status.trim() === "") return;

    try {
      await new UpdateRecordUseCase().handle({
        id,
        year: Number(year),
        status,
      });
      navigate("/");
    } catch (error) {
      console.log("Error to update this record", error);
    }
  }

  useEffect(() => {
    let canceled = false;

    if (!id) return;

    async function loadRecord() {
      try {
        setLoading(true);
        setError(null);
        const recordById = await new GetRecordByIdUseCase().handle(id!);
        if (!canceled) {
          setRecord(recordById);
          setYear(String(recordById.year));
          setStatus(recordById.status);
        }
      } catch (error) {
        console.log("Error to load this record data.", error);
        if (!canceled) {
          setError("Erro ao buscar dados do disco");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadRecord();

    return () => {
      canceled = true;
    };
  }, [id]);

  return (
    <PageShell>
      <div className="form-page">
        <Link to="/" className="back-link">
          ← Voltar
        </Link>

        {loading && (
          <div className="state-card">
            <p>💿 Procurando o disco...</p>
          </div>
        )}

        {!loading && (error || !record) && (
          <div className="state-card state-card-error">
            <p>{error ?? "Erro ao buscar disco"}</p>
          </div>
        )}

        {!loading && record && (
          <div className="card form-card">
            <div className="record-card-top">
              <span className="record-avatar" aria-hidden="true">
                {statusEmoji(record.status)}
              </span>
              <div className="record-card-heading">
                <h1 className="form-title record-title">
                  {record.albumTitle}
                </h1>
                <p className="record-artist">{record.artist}</p>
              </div>
            </div>

            <form onSubmit={handleSaveEdit} className="form-grid">
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
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="novo">Novo</option>
                  <option value="usado">Usado</option>
                  <option value="riscado">Riscado</option>
                </select>
              </label>
              <button type="submit" className="btn btn-primary btn-lg">
                Salvar alterações
              </button>
            </form>
          </div>
        )}
      </div>
    </PageShell>
  );
}
