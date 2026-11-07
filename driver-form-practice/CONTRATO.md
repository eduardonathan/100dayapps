# Contrato do backend (o "Swagger")

Backend: `npm run server` → `http://localhost:3001` (json-server, resposta com 600 ms de atraso).

## GET /vehicles

Opções do Autocomplete de veículo.

```json
[
  { "id": 1, "plate": "BRA2E19", "model": "Moto CG 160" },
  { "id": 2, "plate": "XYZ9K88", "model": "Moto Biz 125" },
  { "id": 3, "plate": "ABC1D23", "model": "Fiorino" }
]
```

## GET /drivers/:id

O que o backend **devolve**. Tem os ids 12 e 13 no banco.

```jsonc
{
  "id": 12,
  "name": "Carlos Souza",
  "phone": "11987654321",                 // só dígitos (DDD + número)
  "license_expires_at": "2027-03-31",     // validade da CNH, "yyyy-MM-dd"
  "shift_start": "08:00:00",              // início do turno, "HH:mm:ss"
  "shift_end": "17:30:00",                // fim do turno, "HH:mm:ss"
  "work_days": [1, 2, 3, 4, 5],           // 0 = domingo ... 6 = sábado
  "vehicle": { "id": 3, "plate": "ABC1D23", "model": "Fiorino" },  // ou null
  "fee_per_delivery_cents": 850,          // taxa por entrega em centavos (R$ 8,50)
  "is_active": true,
  "created_at": "2026-09-01T12:00:00.000Z"
}
```

## POST /drivers

O body que o backend **espera**:

```jsonc
{
  "name": "Carlos Souza",                 // string, obrigatório
  "phone": "11987654321",                 // string, SÓ dígitos, 10 ou 11
  "license_expires_at": "2027-03-31",     // string "yyyy-MM-dd", obrigatório
  "shift_start": "08:00:00",              // string "HH:mm:ss", obrigatório
  "shift_end": "17:30:00",                // string "HH:mm:ss", obrigatório
  "work_days": [1, 2, 3, 4, 5],           // number[], pelo menos 1
  "vehicle_id": 3,                        // number | null (sem veículo = null)
  "fee_per_delivery_cents": 850,          // number inteiro, pode ser 0
  "is_active": true                       // boolean
}
```

Resposta (201): o entregador criado, **no mesmo formato do GET /drivers/:id**.

## PUT /drivers/:id

Atualiza um entregador que já existe. O body é **igual ao do POST /drivers** (os mesmos 9 campos, as mesmas regras). O `id` vai **na URL**, não no body.

Resposta (200): o entregador atualizado, **no mesmo formato do GET /drivers/:id** (o `created_at` original é mantido).

Id que não existe → 404.

> O json-server não valida nada: ele salva o que você mandar. Quem garante que o body está certo é o seu front (Zod + `toPayload`).
>
> Pra limpar os entregadores de teste, apague-os do `db.json` com o servidor parado.
