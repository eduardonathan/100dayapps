import {
  Alert,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import type {
  Ticket,
  TicketCategoryOption,
  TicketListItem,
  TicketStatus,
} from "../types/Ticket";
import { ListTicketsUseCase } from "../use-cases/list-tickets.use-case";
import { useDebounce } from "../utils/use-debounce";
import { ListTicketCategoryOptionsUseCase } from "../use-cases/list-category-options.use-case";
import { GetTicketDetailsUseCase } from "../use-cases/get-ticket-details.use-case";

/*
 * O contrato do backend está em CONTRATO.md.
 * Pra rodar: `npm run server` num terminal e `npm run dev` em outro.
 *
 * Material de base: docs/estudos/tipando-requisicoes.md, no admin do trabalho.
 *
 * ================================= ROTEIRO =================================
 * PARTE 1 — A RESPONSE (do JSON pro tipo)
 * Etapa 1  — Ver o JSON de verdade (aba Network) e comparar com o exemplo do PR:
 *            o que pode vir null? o que é enum?
 * Etapa 2  — O ITEM da listagem: TicketStatus (enum) + TicketListItem
 *                                              (src/types/Ticket.ts)
 * Etapa 3  — O ENVELOPE: ListTicketsResponse + ListTicketsUseCase (sem filtros)
 *                                              (src/api/use-cases/)
 * Etapa 4  — O DETALHE: Ticket (formato completo) + GetTicketByIdUseCase
 *            (nomear pelo FORMATO, não pelo recurso)
 * Etapa 5  — As OPÇÕES: TicketCategoryOption + envelope + usecase
 *
 * PARTE 2 — AS PROPS (o que eu mando pra API)
 * Etapa 6  — O que o backend aceita × o que a tela usa (a interseção)
 * Etapa 7  — ListTicketsProps + tradução de nomes no `params`
 *            (page → offset, categoryId → category_id, "" → undefined)
 *
 * PARTE 3 — A TELA
 * Etapa 8  — Tabela da listagem com loading e erro
 * Etapa 9  — Filtros: status, categoria (das opções) e busca
 * Etapa 10 — Paginação
 * Etapa 11 — Detalhe ao clicar num chamado
 */

const PAGE_SIZE = 10;
const STATUS_OPTIONS: { value: TicketStatus; label: string }[] = [
  { value: "open", label: "Aberto" },
  { value: "in_progress", label: "Em atendimento" },
  { value: "resolved", label: "Resolvido" },
  { value: "closed", label: "Fechado" },
];

export function TicketsPage() {
  const [tickets, setTickets] = useState<TicketListItem[]>([]);
  const [status, setStatus] = useState<TicketStatus | "">("");

  const [categories, setCategories] = useState<TicketCategoryOption[]>([]);
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearch = useDebounce(searchText, 500);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    let canceled = false;

    setLoading(true);
    setError(null);
    async function listTickets() {
      try {
        const data = await new ListTicketsUseCase().handle({
          page,
          limit: PAGE_SIZE,
          search: debouncedSearch,
          status: status === "" ? undefined : status,
          categoryId: categoryId === "" ? undefined : categoryId,
        });
        if (!canceled) {
          setTickets(data.tickets);
          setTotalPages(data.total_pages);

          if (page > data.total_pages) {
            setPage(data.total_pages);
          }
        }
      } catch (error) {
        console.error(error);
        if (!canceled) setError("Não foi possível carregar os chamados.");
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    listTickets();

    return () => {
      canceled = true;
    };
  }, [debouncedSearch, page, status, categoryId]);

  useEffect(() => {
    let canceled = false;

    setLoadingCategories(true);
    setCategoryError(null);

    async function listCategories() {
      try {
        const data = await new ListTicketCategoryOptionsUseCase().handle();
        if (!canceled) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error(error);
        if (!canceled)
          setCategoryError("Não foi possível carregar as categorias.");
      } finally {
        if (!canceled) {
          setLoadingCategories(false);
        }
      }
    }

    listCategories();

    return () => {
      canceled = true;
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    if (selectedId === null) return;
    let canceled = false;

    setLoadingDetail(true);
    setDetailError(null);
    setTicket(null);

    async function getTicketDetails(id: number) {
      try {
        const data = await new GetTicketDetailsUseCase().handle(id);
        if (!canceled) {
          setTicket(data);
        }
      } catch (error) {
        console.error(error);
        if (!canceled) setDetailError("Não foi possível carregar os detalhes.");
      } finally {
        if (!canceled) {
          setLoadingDetail(false);
        }
      }
    }

    getTicketDetails(selectedId);

    return () => {
      canceled = true;
    };
  }, [selectedId]);

  return (
    <Box sx={{ maxWidth: 960, mx: "auto", p: 3 }}>
      <Typography variant="h4" component="h1">
        Chamados
      </Typography>
      <TextField
        label={"Buscar ticket"}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        size="small"
      />
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
        >
          <MenuItem value="">Todos</MenuItem>
          {STATUS_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel>Categorias</InputLabel>
        <Select
          disabled={loadingCategories}
          label="Categorias"
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setPage(1);
          }}
        >
          <MenuItem value="">Todas</MenuItem>
          {categories.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        {categoryError && (
          <FormHelperText error>{categoryError}</FormHelperText>
        )}
      </FormControl>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : tickets.length === 0 ? (
        <Typography>Nenhum chamado encontrado.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Responsável</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow
                  key={ticket.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => setSelectedId(ticket.id)}
                >
                  <TableCell>{ticket.code}</TableCell>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>{ticket.category_name}</TableCell>
                  <TableCell>
                    {ticket.assignee_name ?? "Sem responsável"}
                  </TableCell>
                  <TableCell>{ticket.status_text}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, nextPage) => setPage(nextPage)}
          />
        </TableContainer>
      )}
      <Dialog
        open={selectedId !== null}
        onClose={() => setSelectedId(null)}
        fullWidth
      >
        {/* CORREÇÃO: título fixo. Antes ele lia `ticket.id`, e quando dava erro o `ticket` era null → a tela quebrava */}
        <DialogTitle>Detalhe do chamado</DialogTitle>
        <DialogContent>
          {/* CORREÇÃO: a mesma ordem da lista: carregando → erro → detalhe */}
          {loadingDetail ? (
            <CircularProgress />
          ) : detailError ? (
            // CORREÇÃO: agora o detailError é lido (antes o TS avisava "never read")
            <Alert severity="error">{detailError}</Alert>
          ) : ticket ? (
            // CORREÇÃO: dentro deste ramo o TS sabe que `ticket` é Ticket (não null), então `ticket.x` sem `?.`
            <Stack spacing={1}>
              <Typography variant="h6">
                {ticket.code} — {ticket.title}
              </Typography>
              <Typography>Categoria: {ticket.category.name}</Typography>
              <Typography>
                Responsável: {ticket.assignee_name ?? "Sem responsável"}
              </Typography>
              <Typography>Status: {ticket.status_text}</Typography>
              <Typography>
                Aberto em: {new Date(ticket.created_at).toLocaleString("pt-BR")}
              </Typography>
              <Typography>
                Descrição: {ticket.description ?? "Sem descrição"}
              </Typography>
            </Stack>
          ) : null}
          {/* CORREÇÃO: o `: null` cobre o instante entre o clique e o efeito ligar o loading (nada pra mostrar ainda) */}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
