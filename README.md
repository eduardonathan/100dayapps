# 101 dias de código 🔥

> Em 29 de julho de 2026, prometi programar todos os dias por 101 dias seguidos.
> Em 6 de novembro de 2026, cheguei ao dia 101.

Este repositório guarda o caminho todo: **59 projetos em React + TypeScript**, do primeiro to-do list até um CRUD completo no padrão que uso no trabalho.

<p>
  <img src="https://img.shields.io/badge/dias-101%2F101-success" alt="101 de 101 dias" />
  <img src="https://img.shields.io/badge/projetos-59-blue" alt="59 projetos" />
  <img src="https://img.shields.io/badge/React-TypeScript-3178c6" alt="React com TypeScript" />
</p>

---

## A trajetória

```text
jul ─ ago ─────────── set ─────────────────── out ───────── nov
 🌱 primeiros passos
      🔁 CRUD até ficar automático
                   🌐 API, Axios e rotas
                             📝 formulários com RHF + Zod
                                  🏗️ padrão profissional com MUI
```

### 🌱 Fase 1: primeiros passos
**29/07 → 08/08 · 8 projetos**

O começo: componentes, `useState` e a primeira API de verdade (OMDB). Também foi quando conheci o TanStack Query e montei um front com uma API própria.

`todolist` · `movielist` · `movielist-tsq` · `tarefas-crud` · `pikomon-v1` · `pikomon-v2` · `mural-v1` · `carrinho-de-compras`

### 🔁 Fase 2: CRUD até ficar automático
**11/08 → 30/08 · 18 projetos**

Um cadastro atrás do outro, quase um por dia. Listar, criar, editar e excluir em domínios diferentes, até o fluxo sair sem consulta.

<details>
<summary>Ver os 18 projetos</summary>

`cadastro-de-clientes` · `cadastro-funcionario-rh` · `cadastro-produto-estoque` · `cadastro-de-filmes` · `cadastro-de-veiculos` · `cadastro-de-pedidos` · `cadastro-de-salas` · `cadastro-de-entregas` · `cadastro-de-fornecedor` · `reserva-de-hotel` · `cadastro-de-ingressos` · `controle-de-contas` · `manutencao-veiculos` · `filmes-assistidos` · `filmes-assistido-baseC` · `receitas-culinarias` · `manutencao-celulares` · `streaming-subs`

</details>

### 🌐 Fase 3: API, Axios e rotas
**31/08 → 22/09 · 18 projetos**

Os dados saíram do `useState` e foram pra uma API, com Axios e `json-server`. Depois vieram as páginas com React Router: admin, detalhes e várias telas no mesmo app.

<details>
<summary>Ver os 18 projetos</summary>

`reservation-restaurant` · `gym-sharks` · `helpdesk` · `rentahouse` · `card-checker` · `gym-sharks-admin` · `mediplus` · `love-food` · `estilos-cabeleireiro` · `pet-a-pet` · `store-search` · `livroteca` · `folhagem` · `discoteca` · `rpg-character-sheets` · `wine-catalog` · `bike-maintenance` · `gym-membership`

</details>

### 📝 Fase 4: formulários com React Hook Form + Zod
**23/09 → 30/09 · 10 projetos**

Validação de verdade: schema com Zod, tipos com `z.infer` e mensagens de erro em cada campo.

`gym-equipments` · `vinyl-collection` · `comic-collection` · `sneaker-collection` · `boardgame-collection` · `perfume-collection` · `brazilian-clubs` · `craft-beer-collection` · `plant-shop` · `skate-shop`

### 🏗️ Fase 5: padrão profissional com MUI
**02/10 → 06/11 · 5 projetos**

Menos projetos novos e mais profundidade. Cada um repete o mesmo tema várias vezes, até eu conseguir explicar o porquê de cada linha.

| Projeto | Foco |
|---|---|
| `event-scheduler-practice` | MUI, Formik e datas com `date-fns` |
| `driver-form-practice` | RHF + Zod com MUI e usecases por endpoint |
| `support-tickets-practice` | tipar requisições com Axios |
| `edit-flow-practice` | lista + drawer, `onEdit` e `reset` |
| `crud-practice` | CRUD completo: `GET`, `POST` e `PUT`, com `refreshKey` e cancelamento no `useEffect` |

---

## O que ficou

- **Repetir funciona.** No começo, cada CRUD era novidade. No dia 101, reconstruí o fluxo de edição de memória.
- **Ver o valor acontecendo ensina mais que ler.** Um `console.log` no lugar certo vale mais que uma explicação.
- **Compilar não prova que eu entendi.** Só dá pra dizer que entendi quando consigo explicar com as minhas palavras.
- **Constância ganha de intensidade.** Teve dia de projeto inteiro e teve dia de um ajuste só, mas nenhum dia em branco.

## Stack

React · TypeScript · Vite · Material UI · React Hook Form · Zod · Formik · Axios · TanStack Query · React Router · json-server

## Como rodar um projeto

```bash
cd nome-do-projeto
npm install
npm run dev
```

Nos projetos com API de mentira, rode também `npm run server` (`json-server`) em outro terminal.

---

**Dia 101 de 101. Promessa cumprida.** ✅
