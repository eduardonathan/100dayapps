/*
 * Backend de mentira com json-server. NÃO faz parte do exercício.
 *
 *   GET    /super_admins/equipment_management/equipments      devolve { equipments }
 *   POST   /super_admins/equipment_management/equipments      { name, serial_number }
 *   PUT    /super_admins/equipment_management/equipments/:id  { name, serial_number }
 *   DELETE /super_admins/equipment_management/equipments/:id
 *
 * Toda resposta demora 600 ms, pra você ver o carregando.
 */
const jsonServer = require("json-server");

const BASE_PATH = "/super_admins/equipment_management/equipments";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const equipments = () => router.db.get("equipments");

server.use(jsonServer.defaults());
server.use((_req, _res, next) => setTimeout(next, 600));
server.use(jsonServer.bodyParser);

server.get(BASE_PATH, (_req, res) => {
  res.json({ equipments: equipments().value() });
});

server.post(BASE_PATH, (req, res) => {
  const equipment = {
    id: `eq-${Date.now()}`,
    name: req.body.name,
    serial_number: req.body.serial_number,
  };

  equipments().push(equipment).write();
  res.status(201).json(equipment);
});

server.put(`${BASE_PATH}/:id`, (req, res) => {
  const current = equipments().find({ id: req.params.id });

  if (!current.value()) {
    res.status(404).json({ message: "Equipamento não encontrado" });
    return;
  }

  res.json(
    current
      .assign({ name: req.body.name, serial_number: req.body.serial_number })
      .write(),
  );
});

server.delete(`${BASE_PATH}/:id`, (req, res) => {
  const current = equipments().find({ id: req.params.id });

  if (!current.value()) {
    res.status(404).json({ message: "Equipamento não encontrado" });
    return;
  }

  equipments().remove({ id: req.params.id }).write();
  res.status(204).end();
});

server.listen(3001, () => {
  console.log("Backend rodando em http://localhost:3001");
});
