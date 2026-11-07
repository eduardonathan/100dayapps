import { Autocomplete, TextField } from "@mui/material"; // ← isso vai no TOPO do arquivo
import { Controller, useForm } from "react-hook-form"; // ← isso também

export interface CancelReason {
  id: number;
  text: string;
}

export function findCancelReason(
  reasons: CancelReason[],
  id: number | null,
): CancelReason | null {
  return reasons.find((r) => r.id === id) ?? null;
}

export function findCancelReasons(
  reasons: CancelReason[],
  ids: number[],
): CancelReason[] {
  return reasons.filter((r) => ids.includes(r.id));
}

export function cancelReasonToId(selected: CancelReason | null): number | null {
  return selected?.id ?? null;
}

export function cancelReasonsToIds(selected: CancelReason[]): number[] {
  return selected.map((s) => s.id);
}

export interface Shift {
  code: number;
  label: string;
}

export const shifts: Shift[] = [
  { code: 0, label: "Manhã" },
  { code: 1, label: "Tarde" },
  { code: 2, label: "Noite" },
];

/*
 * =============================================================================
 *                COLA: LER e ESCREVER de Autocomplete (as 4 combinações)
 * =============================================================================
 *
 * O PROBLEMA: o Autocomplete trabalha com OBJETOS (casacos), e o form guarda
 * só os IDs (fichas). Precisa de dois tradutores:
 *
 *   LER       form → tela      ficha(s) → casaco(s)   vai no `value`
 *   ESCREVER  tela → form      casaco(s) → ficha(s)   vai no `onChange`
 *
 * ANTES DE ESCREVER, responde 2 perguntas (independentes uma da outra):
 *
 *   A) SINGLE ou MULTIPLE?   → decide a OPERAÇÃO e os TIPOS
 *        single:   find  (para no 1º que bate)  · vazio = null
 *        multiple: filter (pega todos que batem) · vazio = []
 *
 *   B) CONSTANTE ou BACKEND? → decide SÓ se a lista entra nos parênteses
 *        constante: a lista tá escrita no código → a função enxerga direto
 *        backend:   a lista mora num useState    → a função RECEBE ela
 *
 *   Receita do B: escreve a versão backend. Se a lista for constante,
 *   apaga ela dos parênteses. O corpo não muda.
 *
 *   O ESCREVER nunca depende do B: ele só lê o .id do casaco que já tá na mão.
 */

// =============================================================================
// CONSTANTE — a lista tá escrita aqui no código (ex.: cores fixas)
// =============================================================================

export interface Color {
  id: number;
  name: string;
}

export const colors: Color[] = [
  { id: 1, name: "Azul" },
  { id: 2, name: "Vermelho" },
  { id: 3, name: "Verde" },
];

// ----- SINGLE + CONSTANTE --------------------------------------------------
// LER: recebe UMA ficha (number | null) → devolve UM casaco (Color | null)
//   find para no primeiro que bate; se ninguém bate, devolve undefined,
//   e o ?? null troca pelo vazio do single.
//   Sem a lista nos parênteses: `colors` é a constante lá de cima.
export function findColor(id: number | null): Color | null {
  return colors.find((c) => c.id === id) ?? null;
}

// ESCREVER: recebe UM casaco (Color | null) → devolve UMA ficha (number | null)
//   ?. protege a leitura (o usuário limpou o campo → chega null)
//   ?? escolhe o vazio (undefined → null) e segura o id 0 (|| não seguraria)
export function colorToId(color: Color | null): number | null {
  return color?.id ?? null;
}

// ----- MULTIPLE + CONSTANTE ------------------------------------------------
// LER: recebe VÁRIAS fichas (number[]) → devolve VÁRIOS casacos (Color[])
//   filter passa por TODA a lista de opções e guarda quem tá nas fichas.
//   Sem ?? : o filter nunca devolve undefined (no pior caso, []).
//   A ordem na tela segue a LISTA DE OPÇÕES, não a ordem dos cliques.
export function findColors(ids: number[]): Color[] {
  return colors.filter((c) => ids.includes(c.id));
}

// ESCREVER: recebe VÁRIOS casacos (Color[]) → devolve VÁRIAS fichas (number[])
//   map transforma cada casaco na ficha dele.
//   Sem ?. e sem ?? : o multiple nunca entrega null (removeu tudo → []).
export function colorsToIds(selected: Color[]): number[] {
  return selected.map((c) => c.id);
}

// =============================================================================
// BACKEND — a lista vem de um GET e mora num estado (ex.: lojas)
//   no componente: const [stores, setStores] = useState<Store[]>([]);
//   enquanto carrega, stores = [] (NUNCA null) → por isso a lista não tem | null
// =============================================================================

export interface Store {
  id: number;
  name: string;
}

// ----- SINGLE + BACKEND ----------------------------------------------------
// LER: igual ao single constante, MAS a lista entra como 1º parâmetro,
//   porque a função mora fora do componente e não enxerga o estado.
//   No componente: value={findStore(stores, field.value)}
//   Lista ainda vazia (carregando) → find não acha → ?? null → campo vazio;
//   quando a lista chega, o re-render chama o LER de novo e o casaco aparece.
export function findStore(stores: Store[], id: number | null): Store | null {
  return stores.find((s) => s.id === id) ?? null;
}

// ESCREVER: IGUAL ao constante (não procura nada na lista).
//   No componente: onChange={(_, store) => field.onChange(storeToId(store))}
export function storeToId(store: Store | null): number | null {
  return store?.id ?? null;
}

// ----- MULTIPLE + BACKEND --------------------------------------------------
// LER: igual ao multiple constante, MAS com a lista como 1º parâmetro.
//   No componente: value={findStores(stores, field.value)}
//   Lista ainda vazia → filter devolve [] → sem chips até a lista chegar.
export function findStores(stores: Store[], ids: number[]): Store[] {
  return stores.filter((s) => ids.includes(s.id));
}

// ESCREVER: IGUAL ao constante.
//   No componente: multiple + onChange={(_, selected) => field.onChange(storesToIds(selected))}
export function storesToIds(selected: Store[]): number[] {
  return selected.map((s) => s.id);
}

/*
 * RESUMO EM UMA TABELA
 *
 *                   SINGLE                              MULTIPLE
 *   LER (const)     findX(id: number | null): X | null  findXs(ids: number[]): X[]
 *   LER (backend)   findX(lista: X[], id: ...): ...     findXs(lista: X[], ids: ...): ...
 *   operação        find(x => x.id === id) ?? null      filter(x => ids.includes(x.id))
 *   ESCREVER        xToId(x: X | null): number | null   xsToIds(xs: X[]): number[]
 *                   x?.id ?? null                       xs.map(x => x.id)
 *   vazio           null                                []
 *
 * CHECKLIST antes de dar como pronto:
 *   □ comentário A/B escrito          □ nomes em camelCase (plural no multiple)
 *   □ | null só na ficha e no casaco do SINGLE (a lista nunca tem | null)
 *   □ tipo de retorno declarado (é ele que pega o undefined vazando)
 *   □ ?? e nunca || (id pode ser 0)   □ as 4 funções existem?
 */

//Dominio 1 -
interface Category {
  id: number;
  name: string;
}

// constante por causa da lista
const categories: Category[] = [
  { id: 1, name: "Gás" },
  { id: 2, name: "Água" },
  { id: 3, name: "Acessórios" },
];

// single -> usa find. pega o primeiro e unico q bater.
export function findCategory(id: number | null): Category | null {
  return categories.find((c) => c.id === id) ?? null;
}
export function categoryToId(selected: Category | null): number | null {
  return selected?.id ?? null;
}

// Dominio 1 - Multiple e constante

// multiple -> filter, pega todos que baterem a condicao
export function findCategories(ids: number[]): Category[] {
  return categories.filter((c) => ids.includes(c.id));
}

export function categoriesToIds(selected: Category[]): number[] {
  return selected.map((s) => s.id);
}

//-------------------//
// Dominio 1 - Single + backend

export function findCategoryB(
  categories: Category[],
  id: number | null,
): Category | null {
  return categories.find((c) => c.id === id) ?? null;
}

export function categoryToIdB(category: Category | null): number | null {
  return category?.id ?? null;
}

//Dominio 1 - Multiple + backend

export function findCategoriesB(
  categories: Category[],
  ids: number[],
): Category[] {
  return categories.filter((c) => ids.includes(c.id));
}

export function categoriesToIdsB(selected: Category[]): number[] {
  return selected.map((s) => s.id);
}

//--------------------------------//
//Dominio 2

interface Reseller {
  id: number;
  company_name: string;
}

// Vai ser single + backend ja que o claude n deu a lista hehe
export function findReseller(
  resellers: Reseller[],
  id: number | null,
): Reseller | null {
  return resellers.find((r) => r.id === id) ?? null;
}

export function resellerToId(reseller: Reseller | null): number | null {
  return reseller?.id ?? null;
}

// Multiple + backend

export function findResellers(
  resellers: Reseller[],
  ids: number[],
): Reseller[] {
  return resellers.filter((r) => ids.includes(r.id));
}

export function resellersToIds(selected: Reseller[]): number[] {
  return selected.map((s) => s.id);
}

// Dominio 3 - Constante
interface OrderStatus {
  value: number;
  label: string;
}

const orderStatuses: OrderStatus[] = [
  { value: 0, label: "Pendente" },
  { value: 1, label: "Em rota" },
  { value: 2, label: "Entregue" },
];

// Quando single e constante passar somente o id/value ou nulo e devolver um objeto/dado ou nulo
// ai fazemos o find p pegar o primeiro item da lista constante.
export function findStatus(value: number | null): OrderStatus | null {
  return orderStatuses.find((o) => o.value === value) ?? null;
}

// Quando single e constante passamos o selected do tipo dado/model e retornamos somente o id com number ou null
export function statusToValue(selected: OrderStatus | null): number | null {
  return selected?.value ?? null;
}

// Multiple + constant
export function findStatuses(values: number[]): OrderStatus[] {
  return orderStatuses.filter((o) => values.includes(o.value));
}

export function statusesToValues(selected: OrderStatus[]): number[] {
  return selected.map((s) => s.value);
}

// Dominio 4
interface Neighborhood {
  code: number;
  name: string;
}

// Single + back
export function findNeighborhood(
  neighborhoods: Neighborhood[],
  code: number | null,
): Neighborhood | null {
  return neighborhoods.find((n) => n.code === code) ?? null;
}

export function neighborhoodToCode(
  neighborhood: Neighborhood | null,
): number | null {
  return neighborhood?.code ?? null;
}

// Multiple + back
export function findNeighborhoods(
  neighborhood: Neighborhood[],
  codes: number[],
): Neighborhood[] {
  return neighborhood.filter((n) => codes.includes(n.code));
}

export function neighborhoodsToCodes(neighborhoods: Neighborhood[]): number[] {
  return neighborhoods.map((n) => n.code);
}

// // Controller
// <Controller //← CAMADA 1: liga no FORM
//   name="category_id" //① qual gaveta do form?
//   control={control} // ② de qual form? (vem do useForm)
//   render={({ field, fieldState }) => (
//     <Autocomplete //← CAMADA 2: o componente que o usuário usa
//       options={categories} //③ qual é o cabideiro?
//       getOptionLabel={(c) => c.name} //④ o que tá escrito em cada casaco?
//       value={findCategory(field.value)} //⑤ LER: o que a tela mostra?
//       onChange={(_, c) => field.onChange(categoryToId(c))} // ⑥ ESCREVER: o que o form guarda?
//       onBlur={field.onBlur} // ⑦ avisa o RHF que o usuário saiu do campo
//       renderInput={(params) => (
//         <TextField // ← CAMADA 3: o campo de texto desenhado
//           {...params} // ⑧ a ligação interna do Autocomplete (sempre primeiro)
//           label="Categoria" // ⑨ o título do campo
//           inputRef={field.ref} // ⑩ o foco no erro
//           error={fieldState.invalid} // ⑪ fica vermelho?
//           helperText={fieldState.error?.message} // ⑫ qual mensagem?
//         />
//       )}
//     />
//   )}
// />;

interface ProductFormValues {
  category_id: number | null;
}

export function ProductForm() {
  const { control } = useForm<ProductFormValues>({
    defaultValues: { category_id: null },
  });

  return (
    <Controller
      name="category_id"
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          options={categories} // ③
          // CORREÇÃO: o `c` é um CASACO do cabideiro (Category: { id, name }).
          // category_id é a gaveta do FORM, não existe dentro do casaco.
          // O texto da etiqueta do casaco é o `name`.
          getOptionLabel={(c) => c.name} // ④
          value={findCategory(field.value)} // ⑤ LER
          onChange={(_, c) => field.onChange(categoryToId(c))} // ⑥ ESCREVER
          onBlur={field.onBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Categoria" // ⑨
              inputRef={field.ref}
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
      )}
    />
  );
}
