export const STATUS_OPTIONS = [
  "Pendente",
  "Em preparo",
  "Em andamento",
  "Entregue",
  "Cancelado",
];

export function getStatusBadgeClass(status: string) {
  switch (status) {
    case "Entregue":
      return "badge badge-delivered";
    case "Cancelado":
      return "badge badge-canceled";
    case "Pendente":
      return "badge badge-pending";
    case "Em preparo":
    case "Em andamento":
      return "badge badge-progress";
    default:
      return "badge badge-progress";
  }
}

export function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
