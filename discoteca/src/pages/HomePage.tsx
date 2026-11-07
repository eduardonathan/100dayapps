import { Link } from "react-router-dom";
import type { VinylRecord } from "../types/Record";
import { useEffect, useState } from "react";
import { ListRecordsUseCase } from "../api/ListRecordsUseCase";
import { RecordCard } from "../components/RecordCard";
import { UpdateRecordUseCase } from "../api/UpdateRecordUseCase";
import { DeleteRecordUseCase } from "../api/DeleteRecordUseCase";
import { PageShell } from "../components/PageShell";

export function HomePage() {
  const [records, setRecords] = useState<VinylRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let canceled = false;

    async function loadRecords() {
      try {
        setLoading(true);
        setError(null);
        const data = await new ListRecordsUseCase().handle();
        if (!canceled) {
          setRecords(data);
        }
      } catch (error) {
        console.log("Error to load records", error);
        if (!canceled) {
          setError("Erro ao carregar discos");
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    loadRecords();

    return () => {
      canceled = true;
    };
  }, [reloadKey]);

  const filteredRecords = records.filter((r) =>
    r.albumTitle.toLowerCase().includes(searchText.toLowerCase()),
  );

  async function handleSaveEdit(id: string, year: number, status: string) {
    try {
      const recordEdited = await new UpdateRecordUseCase().handle({
        id,
        year,
        status,
      });
      setRecords((actualRecords) =>
        actualRecords.map((r) => (r.id === id ? recordEdited : r)),
      );
    } catch (error) {
      console.log("Error to update this record", error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await new DeleteRecordUseCase().handle(id);
      setRecords((actualRecords) => actualRecords.filter((r) => r.id !== id));
    } catch (error) {
      console.log("Error to delete this record", error);
    }
  }

  return (
    <PageShell>
      <section className="hero">
        <span className="eyebrow">Coleção pessoal</span>
        <h1>Sua próxima faixa está aqui.</h1>
        <p className="hero-subtitle">
          Organize seus discos de vinil e acompanhe o estado de conservação de
          cada um: novo, usado ou riscado.
        </p>
        <Link to="/record/new" className="btn btn-primary btn-lg">
          <span aria-hidden="true">+</span> Cadastrar novo disco
        </Link>
      </section>

      {loading && (
        <div className="state-card">
          <p>💿 Girando o catálogo...</p>
        </div>
      )}

      {!loading && error && (
        <div className="state-card state-card-error">
          <p>{error}</p>
          <button
            className="btn btn-outline"
            onClick={() => setReloadKey((k) => k + 1)}
          >
            Tentar de novo
          </button>
        </div>
      )}

      {!loading && !error && records.length === 0 && (
        <div className="state-card">
          <p>Nenhum disco por aqui ainda.</p>
          <Link to="/record/new" className="btn btn-outline">
            Cadastrar o primeiro
          </Link>
        </div>
      )}

      {!loading && !error && records.length > 0 && (
        <div className="search-bar">
          <span className="search-icon" aria-hidden="true">
            🔍
          </span>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Buscar pelo título do álbum..."
            aria-label="Buscar pelo título do álbum"
          />
        </div>
      )}

      {!loading &&
        !error &&
        records.length > 0 &&
        filteredRecords.length === 0 && (
          <div className="state-card">
            <p>Nenhum disco encontrado para "{searchText}".</p>
          </div>
        )}

      {!loading && !error && filteredRecords.length > 0 && (
        <div className="record-grid">
          {filteredRecords.map((r) => (
            <RecordCard
              key={r.id}
              record={r}
              onSaveEdit={handleSaveEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </PageShell>
  );
}
