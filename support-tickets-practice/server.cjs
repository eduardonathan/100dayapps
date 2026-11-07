/*
 * Backend de mentira com json-server. NÃO faz parte do exercício.
 *
 * O banco (db.json) guarda os chamados "crus". Este arquivo monta as respostas
 * no formato do CONTRATO.md, igual a um backend de verdade:
 *   - a listagem devolve um ENVELOPE (lista + paginação), em formato resumido;
 *   - o detalhe devolve o chamado completo, com a categoria aninhada;
 *   - as opções de categoria vêm dentro de um envelope próprio.
 * Toda resposta demora 600 ms, pra você ver o "carregando...".
 */
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const db = router.db;

server.use(jsonServer.defaults());
server.use((_req, _res, next) => setTimeout(next, 600));

const STATUS_TEXT = {
  open: "Aberto",
  in_progress: "Em atendimento",
  resolved: "Resolvido",
  closed: "Fechado",
};

function findCategory(id) {
  return db.get("ticket_categories").find({ id }).value() ?? null;
}

// formato RESUMIDO (usado na listagem)
function toListItem(ticket) {
  return {
    id: ticket.id,
    code: ticket.code,
    title: ticket.title,
    category_name: findCategory(ticket.category_id)?.name ?? "",
    assignee_name: ticket.assignee_name,
    status: ticket.status,
    status_text: STATUS_TEXT[ticket.status],
    deletable: ticket.status === "open",
  };
}

// formato COMPLETO (usado no detalhe)
function toDetail(ticket) {
  return {
    id: ticket.id,
    code: ticket.code,
    title: ticket.title,
    description: ticket.description,
    category: findCategory(ticket.category_id),
    assignee_name: ticket.assignee_name,
    status: ticket.status,
    status_text: STATUS_TEXT[ticket.status],
    created_at: ticket.created_at,
  };
}

// GET /tickets/categories_options  (precisa vir ANTES do /tickets/:id)
server.get("/tickets/categories_options", (_req, res) => {
  res.json({ categories: db.get("ticket_categories").value() });
});

// GET /tickets?offset=1&limit=10&status=open&category_id=2&search=pix
server.get("/tickets", (req, res) => {
  const page = Math.max(1, Number(req.query.offset) || 1); // offset = NÚMERO DA PÁGINA
  const limit = Math.max(1, Number(req.query.limit) || 10);
  const { status, category_id, search } = req.query;

  let tickets = db.get("tickets").value();
  if (status) tickets = tickets.filter((t) => t.status === status);
  if (category_id) tickets = tickets.filter((t) => t.category_id === Number(category_id));
  if (search) {
    const term = String(search).toLowerCase();
    tickets = tickets.filter(
      (t) => t.code.toLowerCase().includes(term) || t.title.toLowerCase().includes(term),
    );
  }

  const total_count = tickets.length;
  const total_pages = Math.max(1, Math.ceil(total_count / limit));
  const start = (page - 1) * limit;

  res.json({
    tickets: tickets.slice(start, start + limit).map(toListItem),
    current_page: page,
    total_pages,
    total_count,
  });
});

// GET /tickets/:id
server.get("/tickets/:id", (req, res) => {
  const ticket = db.get("tickets").find({ id: Number(req.params.id) }).value();
  if (!ticket) {
    res.status(404).json({ error: "Chamado não encontrado" });
    return;
  }
  res.json(toDetail(ticket));
});

server.listen(3001, () => {
  console.log("Backend rodando em http://localhost:3001");
});
