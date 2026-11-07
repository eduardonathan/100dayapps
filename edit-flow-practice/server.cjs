/*
 * Backend de mentira com json-server. NÃO faz parte do exercício.
 *
 * Imita a API de categorias do trabalho, sem paginação:
 *   GET  /super_admins/equipment_management/categories      devolve { categories }
 *   POST /super_admins/equipment_management/categories      { name }
 *   PUT  /super_admins/equipment_management/categories/:id  { name }
 *
 * Toda resposta demora 600 ms, pra você ver o carregando.
 */
const jsonServer = require("json-server");

const BASE_PATH = "/super_admins/equipment_management/categories";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const categories = () => router.db.get("categories");

server.use(jsonServer.defaults());
server.use((_req, _res, next) => setTimeout(next, 600));
server.use(jsonServer.bodyParser);

server.get(BASE_PATH, (_req, res) => {
  res.json({ categories: categories().value() });
});

server.post(BASE_PATH, (req, res) => {
  const category = { id: `cat-${Date.now()}`, name: req.body.name };

  categories().push(category).write();
  res.status(201).json(category);
});

server.put(`${BASE_PATH}/:id`, (req, res) => {
  const current = categories().find({ id: req.params.id });

  if (!current.value()) {
    res.status(404).json({ message: "Categoria não encontrada" });
    return;
  }

  res.json(current.assign({ name: req.body.name }).write());
});

server.listen(3001, () => {
  console.log("Backend rodando em http://localhost:3001");
});
