import { useEffect, useState } from "react";
import type { VinylRecord } from "../types/Record";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetRecordByIdUseCase } from "../api/GetRecordByIdUseCase";
import { PageShell } from "../components/PageShell";
import { StatusBadge } from "../components/StatusBadge";
import { statusEmoji } from "../utils/statusEmoji";

export function RecordDetailPage() {
  const { id } = useParams();
  const [record, setRecord] = useState<VinylRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

        {!loading && error && (
          <div className="state-card state-card-error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && record && (
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
              <StatusBadge status={record.status} />
            </div>
            <p className="record-year">{record.year}</p>
            <button
              className="btn btn-outline"
              onClick={() => navigate(`/record/${id}/edit`)}
            >
              Editar
            </button>
          </div>
        )}
      </div>
    </PageShell>
  );
}
