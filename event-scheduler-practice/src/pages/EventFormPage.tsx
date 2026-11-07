import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  InputAdornment,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { format, isValid, parse } from "date-fns";
import { useFormik } from "formik";

/*
 * ===================== CONTRATO DO BACKEND (o "Swagger") =====================
 *
 * POST /events — body que o backend ESPERA:
 * {
 *   "name": "Aula de yoga",              // string, obrigatório
 *   "description": null,                  // string | null (vazio = null)
 *   "start_date": "2026-10-15",           // string "yyyy-MM-dd"
 *   "start_time": "14:30:00",             // string "HH:mm:ss"
 *   "recurrence_days": [1, 3, 5],         // number[] (0 = domingo ... 6 = sábado)
 *   "max_participants": 20,               // number | null (vazio = sem limite)
 *   "price_cents": 1990,                  // number inteiro em centavos (R$ 19,90)
 *   "is_public": true,                    // boolean
 *   "category_id": 2                      // number | null
 * }
 *
 * GET /events/:id — o que o backend DEVOLVE (usado na tela de edição, etapa final):
 * {
 *   "id": 7,
 *   "name": "Aula de yoga",
 *   "description": "Traga seu tapete",
 *   "start_date": "2026-10-15",
 *   "start_time": "14:30:00",
 *   "recurrence_days": [1, 3, 5],
 *   "max_participants": null,
 *   "price_cents": 1990,
 *   "is_public": true,
 *   "category": { "id": 2, "name": "Esporte" },
 *   "created_at": "2026-10-01T12:00:00.000Z"
 * }
 *
 * ================================= ROTEIRO =================================
 * Etapa 1 — Types: EventPayload, EventFormValues (e depois EventApi)
 * Etapa 2 — useFormik + initialValues + submit com console.log
 * Etapa 3 — name e description        (TextField: string ⇄ string)
 * Etapa 4 — is_public                 (Switch: boolean ⇄ checked)
 * Etapa 5 — max_participants e preço  (número digitado: string no form)
 * Etapa 6 — category_id               (Autocomplete single: id ⇄ objeto)
 * Etapa 7 — recurrence_days           (Autocomplete multiple: ids ⇄ objetos)
 * Etapa 8 — start_date e start_time   (Date/TimePicker: string ⇄ Date)
 * Etapa 9 — toPayload()               (form → backend)
 * Etapa 10 — toFormValues()           (backend → form, modo edição)
 */

// Opções prontas (são "dados", não fazem parte do exercício)
const diasDaSemana = [
  { value: 0, label: "Domingo" },
  { value: 1, label: "Segunda" },
  { value: 2, label: "Terça" },
  { value: 3, label: "Quarta" },
  { value: 4, label: "Quinta" },
  { value: 5, label: "Sexta" },
  { value: 6, label: "Sábado" },
];

const categorias = [
  { id: 1, name: "Música" },
  { id: 2, name: "Esporte" },
  { id: 3, name: "Educação" },
];

interface CategoryApi {
  id: number;
  name: string;
}

interface EventPayload {
  name: string;
  description: string | null;
  start_date: string;
  start_time: string;
  recurrence_days: number[];
  max_participants: number | null;
  price_cents: number;
  is_public: boolean;
  category_id: number | null;
}

interface EventFormValues {
  name: string;
  description: string;
  start_date: string;
  start_time: string; // "HH:mm"
  recurrence_days: number[];
  max_participants: string;
  price: string; // "19,90" — input de texto = string
  is_public: boolean;
  category_id: number | null;
}

interface EventApi {
  id: number;
  name: string;
  description: string | null;
  start_time: string;
  start_date: string;
  recurrence_days: number[];
  max_participants: number | null;
  price_cents: number;
  is_public: boolean;
  category: CategoryApi | null;
  created_at: string;
}

const mockEventApi: EventApi = {
  id: 7,
  name: "Aula de yoga",
  description: "Traga seu tapete",
  start_date: "2026-10-15",
  start_time: "14:30:00",
  recurrence_days: [1, 3, 5],
  max_participants: null,
  price_cents: 1990,
  is_public: true,
  category: { id: 2, name: "Esporte" },
  created_at: "2026-10-01T12:00:00.000Z",
};

const emptyValues: EventFormValues = {
  name: "",
  description: "",
  start_date: "",
  start_time: "",
  recurrence_days: [],
  max_participants: "",
  price: "",
  is_public: false,
  category_id: null,
};

function findCategory(id: number | null) {
  return categorias.find((c) => c.id === id) ?? null;
}

function findDays(ids: number[]) {
  return diasDaSemana.filter((d) => ids.includes(d.value));
}

// IDA (ESCREVER): Date do picker → string do form
// CORREÇÃO 1a: parâmetro era `Date`. O onChange entrega `Date | null`
// (null = usuário apagou o campo), então o parâmetro aceita os dois.
function dateToStringDate(date: Date | null): string {
  // caminho feliz: não é null E é uma data de verdade (não Invalid Date)
  if (date && isValid(date)) {
    return format(date, "yyyy-MM-dd");
  }
  // CORREÇÃO 1b: faltava o caminho do vazio. Sem ele a função devolvia
  // `undefined` quando o if não passava. O vazio do FORM é "".
  return "";
}

// VOLTA (LER): string do form → Date do picker
// CORREÇÃO 2a: retorno era `Date`, mas o vazio do picker é `null`.
// CORREÇÃO 2b: parâmetro renomeado de `date` para `value`, porque aqui
// ainda é uma STRING, não uma data.
function stringDateToDate(value: string): Date | null {
  // passo 1: vazio do form ("") vira vazio do picker (null)
  if (value === "") {
    return null;
  }
  // passo 2: string → Date, com o MESMO molde da ida
  const date = parse(value, "yyyy-MM-dd", new Date());
  // passo 3 (CORREÇÃO 2c): o isValid vem DEPOIS do parse, porque ele checa
  // um Date. String ruim ("abc", "2029/01/18") → Invalid Date → null.
  return isValid(date) ? date : null;
}

function timeToStringTime(time: Date | null): string {
  if (time && isValid(time)) {
    return format(time, "HH:mm");
  }
  return "";
}

function stringTimeToTime(value: string): Date | null {
  if (value === "") {
    return null;
  }
  const time = parse(value, "HH:mm", new Date());

  return isValid(time) ? time : null;
}

function toPayload(values: EventFormValues): EventPayload {
  return {
    name: values.name,
    start_date: values.start_date,
    recurrence_days: values.recurrence_days,
    is_public: values.is_public,
    category_id: values.category_id,
    description: values.description.trim() || null,
    max_participants:
      values.max_participants.trim() === ""
        ? null
        : Number(values.max_participants),
    start_time: `${values.start_time}:00`,
    price_cents: Math.round(Number(values.price.replace(",", ".")) * 100),
  };
}

function centsToPrice(cents: number) {
  return (cents / 100).toFixed(2).replace(".", ",");
}

function toFormValues(api: EventApi): EventFormValues {
  return {
    name: api.name,
    start_date: api.start_date,
    recurrence_days: api.recurrence_days,
    is_public: api.is_public,
    description: api.description ?? "",
    max_participants: api.max_participants?.toString() ?? "",
    start_time: api.start_time.slice(0, 5),
    price: centsToPrice(api.price_cents),
    category_id: api.category?.id ?? null,
  };
}

export function EventFormPage() {
  const formik = useFormik<EventFormValues>({
    initialValues: toFormValues(mockEventApi),
    onSubmit: (values) => {
      const payload = toPayload(values);
      console.log(payload);
    },
  });

  function setField<K extends keyof EventFormValues>(
    field: K,
    value: EventFormValues[K],
  ) {
    formik.setFieldValue(field, value);
  }

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ maxWidth: 480, mx: "auto", p: 3 }}
    >
      <Stack spacing={3}>
        <Typography variant="h4" component="h1">
          Novo evento
        </Typography>

        <TextField
          label="Nome do evento"
          name="name"
          value={formik.values.name}
          onChange={(e) => setField("name", e.target.value)}
        />
        <TextField
          label="Descrição do evento"
          name="description"
          value={formik.values.description}
          onChange={(e) => setField("description", e.target.value)}
          multiline
          rows={3}
        />
        <FormControlLabel
          label="Evento público"
          control={
            <Switch
              name="is_public"
              checked={formik.values.is_public}
              onChange={(_, checked) => setField("is_public", checked)}
            />
          }
        />
        <TextField
          type="number"
          label="Máximo de participantes"
          name="max_participants"
          value={formik.values.max_participants}
          onChange={(e) => setField("max_participants", e.target.value)}
        />
        <TextField
          label="Preço"
          name="price"
          value={formik.values.price}
          onChange={(e) => setField("price", e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            },
          }}
        />
        <Autocomplete
          options={categorias}
          getOptionLabel={(c) => c.name}
          value={findCategory(formik.values.category_id)}
          onChange={(_, option) => setField("category_id", option?.id ?? null)}
          renderInput={(params) => <TextField {...params} label="Categorias" />}
        />

        <Autocomplete
          multiple
          options={diasDaSemana}
          value={findDays(formik.values.recurrence_days)}
          getOptionLabel={(d) => d.label}
          onChange={(_, options) =>
            setField(
              "recurrence_days",
              options.map((d) => d.value),
            )
          }
          renderInput={(params) => (
            <TextField {...params} label="Dias da semana" />
          )}
        />
        <DatePicker
          label="Data de início"
          slotProps={{ textField: { name: "start_date", fullWidth: true } }}
          value={stringDateToDate(formik.values.start_date)}
          onChange={(date) => setField("start_date", dateToStringDate(date))}
        />
        <TimePicker
          label="Hora de início"
          value={stringTimeToTime(formik.values.start_time)}
          onChange={(time) => setField("start_time", timeToStringTime(time))}
        />

        <Button type="submit" variant="contained">
          Criar evento
        </Button>
      </Stack>
    </Box>
  );
}
