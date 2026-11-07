import { useCallback, useEffect, useMemo, useState } from "react";

import "./App.css";
import { ClassScheduleForm } from "./components/ClassScheduleForm";
import type { ClassSchedule } from "./types/ClassSchedule";
import { CreateClassScheduleUseCase } from "./api/CreateClassScheduleUseCase";
import { ListClassSchedulesUseCase } from "./api/ListClassSchedulesUseCase";
import { ClassScheduleCard } from "./components/ClassScheduleCard";
import { UpdateClassScheduleUseCase } from "./api/UpdateClassScheduleUseCase";
import { DeleteClassScheduleUseCase } from "./api/DeleteClassScheduleUseCase";
import { SearchClassSchedulesUseCase } from "./api/SearchClassScheduleUseCase";

interface Toast {
  id: number;
  message: string;
  tone: "ok" | "error";
}

function Fin({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 46c14-3 21-9 28-23C42 11 50 5 59 4c-1 13-5 23-13 31C37 44 24 50 8 52l-3-3 3-3z"
        fill="currentColor"
      />
      <path
        d="M6 49c19 6 36 4 52-6-12 14-30 18-48 13l-4-7z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

function App() {
  const [classes, setClasses] = useState<ClassSchedule[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [searchText, setSearchText] = useState("");

  const limit = 10;

  const pushToast = useCallback((message: string, tone: Toast["tone"]) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3600);
  }, []);

  useEffect(() => {
    let canceled = false;

    async function loadClasses() {
      try {
        setError(null);
        const data = await new ListClassSchedulesUseCase().handle();
        if (!canceled) setClasses(data);
      } catch (err) {
        console.error("Error to load classes", err);
        if (!canceled) setError("Não foi possível carregar a grade de aulas.");
      } finally {
        if (!canceled) setLoading(false);
      }
    }

    loadClasses();

    return () => {
      canceled = true;
    };
  }, []);

  useEffect(() => {
    if (searchText === "") return;

    let canceled = false;

    const timeoutId = setTimeout(() => {
      async function search() {
        try {
          const data = await new SearchClassSchedulesUseCase().handle({
            searchText,
            limit,
          });
          if (!canceled) {
            setClasses(data);
          }
        } catch (error) {
          console.log("Error to search class");
          if (!canceled) {
            console.log("Erro ao buscar aula");
          }
        }
      }
      search();
    }, 500);

    return () => {
      canceled = true;
      clearTimeout(timeoutId);
    };
  }, [searchText]);

  async function handleCreateClass(
    modality: string,
    instructor: string,
    time: string,
    capacity: number,
  ) {
    try {
      const newClass = await new CreateClassScheduleUseCase().handle({
        modality,
        instructor,
        time,
        capacity,
        enrolled: 0,
      });
      setClasses((actual) => [...actual, newClass]);
      pushToast(`Turma de ${modality} aberta.`, "ok");
    } catch {
      pushToast("Erro ao abrir a turma. Tente novamente.", "error");
    }
  }

  async function handleSaveEdit(
    id: string,
    instructor: string,
    capacity: number,
    enrolled: number,
  ) {
    try {
      const editedClass = await new UpdateClassScheduleUseCase().handle({
        id,
        instructor,
        capacity,
        enrolled,
      });
      setClasses((actual) =>
        actual.map((c) => (c.id === id ? editedClass : c)),
      );
    } catch {
      pushToast("Erro ao atualizar a turma.", "error");
    }
  }

  async function handleDelete(id: string) {
    try {
      await new DeleteClassScheduleUseCase().handle(id);
      setClasses((actual) => actual.filter((c) => c.id !== id));
      pushToast("Turma removida da grade.", "ok");
    } catch {
      pushToast("Erro ao remover a turma.", "error");
    }
  }

  const stats = useMemo(() => {
    let free = 0;
    let seats = 0;
    for (const c of classes) {
      const cap = Number(c.capacity) || 0;
      seats += cap;
      free += Math.max(0, cap - (Number(c.enrolled) || 0));
    }
    const modalities = new Set(
      classes.map((c) => c.modality.trim().toLowerCase()),
    ).size;
    return { total: classes.length, seats, free, modalities };
  }, [classes]);

  const showEmpty = !error && !loading && classes.length === 0;

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <Fin className="brand__fin" />
          <div>
            <span className="brand__name">
              GYM <b>SHARKS</b>
            </span>
            <span className="brand__tag">Agenda de aulas</span>
          </div>
        </div>
        <div className="topbar__meta">
          Unidade Centro
          <b>Recepção · Grade viva</b>
        </div>
      </header>

      <section className="hero">
        <div>
          <h1 className="hero__title">
            Monte a grade
            <span>sem afogar a recepção</span>
          </h1>
          <p className="hero__lead">
            Cadastre modalidades, instrutores, horários e vagas em um lugar só.
            O que você agendar aqui aparece na hora para o time de balcão.
          </p>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="stat__num">
              {String(stats.total).padStart(2, "0")}
            </div>
            <div className="stat__label">Turmas na grade</div>
          </div>
          <div className="stat stat--accent">
            <div className="stat__num">{stats.free}</div>
            <div className="stat__label">Vagas livres</div>
          </div>
          <div className="stat">
            <div className="stat__num">{stats.modalities}</div>
            <div className="stat__label">Modalidades</div>
          </div>
        </div>
      </section>

      <main className="layout">
        <section className="panel panel--form">
          <div className="panel__head">
            <h2>Nova turma</h2>
          </div>
          <div className="panel__body">
            <ClassScheduleForm onCreate={handleCreateClass} />
          </div>
        </section>

        <section className="roster">
          <div className="roster__bar">
            <h2>Grade da semana</h2>
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Buscar por instrutor"
            />
            {!loading && !error && (
              <span className="roster__count">
                {classes.length} {classes.length === 1 ? "turma" : "turmas"}
              </span>
            )}
          </div>

          {loading && (
            <div className="card-list">
              <div className="skeleton" />
              <div className="skeleton" />
              <div className="skeleton" />
              <div className="skeleton" />
            </div>
          )}

          {error && (
            <div className="state state--error">
              <svg
                className="state__mark"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M12 3 2 21h20L12 3Z" strokeLinejoin="round" />
                <path d="M12 10v5M12 18h.01" strokeLinecap="round" />
              </svg>
              <h3>Sem conexão com a grade</h3>
              <p>{error}</p>
            </div>
          )}

          {showEmpty && (
            <div className="state">
              <Fin className="state__mark" />
              <h3>Águas paradas</h3>
              <p>
                Nenhuma turma na grade ainda. Use o painel ao lado para abrir a
                primeira.
              </p>
            </div>
          )}

          {!loading && !error && classes.length > 0 && (
            <div className="card-list">
              {classes.map((c) => (
                <ClassScheduleCard
                  key={c.id}
                  classSchedule={c}
                  onSave={handleSaveEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="foot">
        <span>GYM SHARKS · Painel interno</span>
        <span>
          {stats.total} turmas · {stats.free}/{stats.seats} vagas livres
        </span>
      </footer>

      <div className="toasts" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast ${t.tone === "ok" ? "toast--ok" : ""}`}
          >
            <span className="toast__dot" />
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
