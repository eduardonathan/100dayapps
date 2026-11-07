# Contrato do backend: central de chamados

Backend: `npm run server` → `http://localhost:3001` (json-server, resposta com 600 ms de atraso).

Este contrato tem **duas partes**, como no mundo real:

1. **Exemplos de JSON**, do jeito que aparecem num PR do backend ou no Slack. Mostram **um** caso.
2. **O "Swagger"**, com os tipos de verdade de cada campo.

> ⚠️ Um exemplo de JSON **não conta tudo**. Antes de tipar, compare os dois e confira a resposta real na aba **Network** do DevTools.

---

## Parte 1: exemplos (o que veio no PR)

### GET /tickets

Listagem paginada dos chamados.

```json
{
  "tickets": [
    {
      "id": 1,
      "code": "CH-0001",
      "title": "Não consigo entrar no app",
      "category_name": "Acesso e login",
      "assignee_name": "Marina Alves",
      "status": "open",
      "status_text": "Aberto",
      "deletable": true
    }
  ],
  "current_page": 1,
  "total_pages": 2,
  "total_count": 15
}
```

### GET /tickets/:id

Detalhe de um chamado.

```json
{
  "id": 1,
  "code": "CH-0001",
  "title": "Não consigo entrar no app",
  "description": "Aparece 'senha inválida' mesmo com a senha certa.",
  "category": { "id": 1, "name": "Acesso e login" },
  "assignee_name": "Marina Alves",
  "status": "open",
  "status_text": "Aberto",
  "created_at": "2026-10-01T11:00:00.000Z"
}
```

Id que não existe → **404**.

### GET /tickets/categories_options

Opções pro select de categoria.

```json
{
  "categories": [
    { "id": 1, "name": "Acesso e login" },
    { "id": 2, "name": "Pagamento" }
  ]
}
```

---

## Parte 2: o "Swagger" (os tipos de verdade)

### Query params do GET /tickets

| Param | Tipo | O que faz |
|---|---|---|
| `offset` | integer | **número da página**, começando em 1 (⚠️ não é "pule N itens") |
| `limit` | integer | itens por página (padrão 10) |
| `status` | string | filtra por status (um dos 4 valores abaixo) |
| `category_id` | integer | filtra por categoria |
| `search` | string | busca no código ou no título |
| `order_by` | string | campo de ordenação |
| `sort_order` | string | `asc` ou `desc` |

### Campos dos chamados

| Campo | Tipo | Observação |
|---|---|---|
| `id` | integer | |
| `code` | string | |
| `title` | string | |
| `description` | string, **nullable** | só no detalhe |
| `category_name` | string | só na listagem (resumido) |
| `category` | object `{ id: integer, name: string }` | só no detalhe (completo) |
| `assignee_name` | string, **nullable** | `null` = chamado sem responsável |
| `status` | string, **enum** | `open` · `in_progress` · `resolved` · `closed` |
| `status_text` | string | o texto pra tela ("Aberto", "Em atendimento"...) |
| `deletable` | boolean | só na listagem |
| `created_at` | string (ISO 8601) | só no detalhe |
| `current_page`, `total_pages`, `total_count` | integer | paginação, no envelope da listagem |
