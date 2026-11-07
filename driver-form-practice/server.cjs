/*
 * Backend de mentira com json-server. NÃO faz parte do exercício.
 *
 * O json-server puro só guarda e devolve o que recebe. Este arquivo deixa ele
 * igual a um backend de verdade em dois pontos:
 *   1. o banco guarda `vehicle_id`, mas o GET de entregador devolve
 *      `vehicle` como objeto (ou null), como está no CONTRATO.md;
 *   2. toda resposta demora 600 ms, pra você ver o "carregando...".
 */
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");

server.use(jsonServer.defaults());
server.use((_req, _res, next) => setTimeout(next, 600));
server.use(jsonServer.bodyParser);
server.use((req, _res, next) => {
  if (req.method === "POST" && req.path === "/drivers") {
    req.body.created_at = new Date().toISOString();
  }
  // PUT substitui o objeto inteiro: mantém o created_at original
  const putMatch = req.method === "PUT" && req.path.match(/^\/drivers\/(\d+)$/);
  if (putMatch) {
    const current = router.db
      .get("drivers")
      .find({ id: Number(putMatch[1]) })
      .value();
    if (current) {
      req.body.created_at = current.created_at;
    }
  }
  next();
});

function expandVehicle(driver) {
  const { vehicle_id, ...rest } = driver;
  const vehicle =
    router.db.get("vehicles").find({ id: vehicle_id }).value() ?? null;
  return { ...rest, vehicle };
}

router.render = (req, res) => {
  const data = res.locals.data;
  if (req.path.startsWith("/drivers")) {
    res.jsonp(Array.isArray(data) ? data.map(expandVehicle) : expandVehicle(data));
    return;
  }
  res.jsonp(data);
};

server.use(router);
server.listen(3001, () => {
  console.log("Backend rodando em http://localhost:3001");
});
