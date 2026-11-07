import {
  Alert,
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
import {
  driverFormSchema,
  type DriverFormValues,
} from "../schemas/driverFormSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import type { Vehicle } from "../types/Driver";
import { ListVehiclesUseCase } from "../api/use-cases/list-vehicles.use-case";
import { format, isValid, parse } from "date-fns";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { toFormValues, toPayload } from "../mappers/driverMappers";
import { CreateDriverUseCase } from "../api/use-cases/create-driver.use-case";
import { GetDriverByIdUseCase } from "../api/use-cases/get-driver-by-id.use-case";
import { UpdateDriverUseCase } from "../api/use-cases/update-driver.use-case";

/*
 * O contrato do backend está em CONTRATO.md (leia antes da etapa 1).
 * Pra rodar: `npm run server` num terminal e `npm run dev` em outro.
 *
 * ================================= ROTEIRO =================================
 * PARTE 1 — Camada de API (o seu padrão)
 * Etapa 1  — Interfaces do contrato           (src/types/Driver.ts)
 * Etapa 2  — Usecases: ListVehicles, GetDriverById, CreateDriver
 *                                              (src/usecases/)
 *
 * PARTE 2 — Zod e RHF do zero
 * Etapa 3  — Zod × RHF: o que cada um faz e por que são separados
 * Etapa 4  — Schema do form com Zod + DriverFormValues com z.infer
 *                                              (src/schemas/driverFormSchema.ts)
 * Etapa 5  — useForm + zodResolver + defaultValues + handleSubmit + errors
 *
 * PARTE 3 — Inputs (a fórmula LER/ESCREVER, agora com Controller)
 * Etapa 6  — name e phone                     (TextField: string ⇄ string)
 * Etapa 7  — is_active                        (Switch: boolean ⇄ checked)
 * Etapa 8  — taxa por entrega                 (dinheiro: string no form)
 * Etapa 9  — veículo                          (Autocomplete single: id ⇄ objeto)
 * Etapa 10 — dias de trabalho                 (Autocomplete multiple: ids ⇄ objetos)
 * Etapa 11 — validade da CNH e turno          (DatePicker + 2 TimePickers)
 *
 * PARTE 4 — Ida e volta com o backend
 * Etapa 12 — toPayload() + CreateDriverUseCase (src/mappers/driverMappers.ts)
 * Etapa 13 — modo edição: GetDriverByIdUseCase + toFormValues() + reset()
 * Etapa 14 — (opcional) conversão dentro do Zod: .transform() / z.codec()
 */

// Opções fixas (são "dados", não fazem parte do exercício)

interface WeekDayOption {
  value: number;
  label: string;
}

const weekDays: WeekDayOption[] = [
  { value: 0, label: "Domingo" },
  { value: 1, label: "Segunda" },
  { value: 2, label: "Terça" },
  { value: 3, label: "Quarta" },
  { value: 4, label: "Quinta" },
  { value: 5, label: "Sexta" },
  { value: 6, label: "Sábado" },
];

const emptyValues: DriverFormValues = {
  name: "",
  phone: "",
  is_active: false,
  fee: "",
  work_days: [],
  license_expires_at: "",
  shift_start: "",
  shift_end: "",
  vehicle_id: null,
};

function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

function formatPhone(value: string): string {
  return value
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d)(\d{4})$/, "$1-$2");
}

function onlyMoneyChars(value: string): string {
  return value.replace(/[^\d,]/g, "");
}

function findVehicle(vehicles: Vehicle[], id: number | null): Vehicle | null {
  return vehicles.find((v) => v.id === id) ?? null;
}

function vehicleToId(vehicle: Vehicle | null): number | null {
  return vehicle?.id ?? null;
}

function findDays(ids: number[]): WeekDayOption[] {
  return weekDays.filter((d) => ids.includes(d.value));
}

function daysToIds(days: WeekDayOption[]): number[] {
  return days.map((d) => d.value);
}

function dateToString(date: Date | null): string {
  if (date === null || !isValid(date)) return "";
  return format(date, "yyyy-MM-dd");
}

function stringToDate(value: string): Date | null {
  if (value.trim() === "") return null;

  const date = parse(value, "yyyy-MM-dd", new Date());

  if (!isValid(date)) return null;

  return date;
}

function timeToString(time: Date | null): string {
  if (time === null || !isValid(time)) return "";
  return format(time, "HH:mm");
}

function stringToTime(value: string): Date | null {
  if (value.trim() === "") return null;

  const time = parse(value, "HH:mm", new Date());

  if (!isValid(time)) return null;

  return time;
}

interface DriverFormPageProps {
  driverId: number | null;
}

export function DriverFormPage({ driverId }: DriverFormPageProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehiclesError, setVehiclesError] = useState<string | null>(null);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [driverError, setDriverError] = useState<string | null>(null);
  const [loadingDriver, setLoadingDriver] = useState(driverId !== null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<DriverFormValues>({
    resolver: zodResolver(driverFormSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    let canceled = false;

    async function loadDrivers() {
      if (driverId === null) return;
      try {
        const data = await new GetDriverByIdUseCase().handle(driverId);
        if (!canceled) {
          reset(toFormValues(data));
        }
      } catch (error) {
        console.log("Error to load driver", error);
        if (!canceled) {
          setDriverError("Erro ao carregar o entregador");
        }
      } finally {
        if (!canceled) {
          setLoadingDriver(false);
        }
      }
    }

    loadDrivers();

    return () => {
      canceled = true;
    };
  }, [driverId, reset]);

  useEffect(() => {
    let canceled = false;

    async function loadVehicles() {
      try {
        const data = await new ListVehiclesUseCase().handle();
        if (!canceled) {
          setVehicles(data);
        }
      } catch (error) {
        console.log("Error to load vehicles", error);
        if (!canceled) {
          setVehiclesError("Erro ao carregar veículos");
        }
      } finally {
        if (!canceled) {
          setLoadingVehicles(false);
        }
      }
    }

    loadVehicles();

    return () => {
      canceled = true;
    };
  }, []);

  async function onSubmit(values: DriverFormValues) {
    if (driverId === null) {
      try {
        const payload = toPayload(values);
        const created = await new CreateDriverUseCase().handle(payload);
        console.log("CRIADO no backend:", created);
      } catch (error) {
        console.error("Erro ao criar entregador:", error);
      }
    } else {
      try {
        const edited = await new UpdateDriverUseCase().handle({
          ...toPayload(values),
          driverId,
        });
        console.log("EDITADO no backend:", edited);
      } catch (error) {
        console.error("Erro ao editar entregador:", error);
      }
    }
  }

  return (
    <Stack>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ maxWidth: 480, mx: "auto", p: 3 }}
      >
        <Stack spacing={3}>
          <Typography variant="h4" component="h1">
            {driverId !== null ? `Editar` : `Novo`} entregador
          </Typography>
          {driverError && (
            <Alert severity="error">Erro ao carregar entregador</Alert>
          )}
          {loadingDriver && <Typography>Carregando entregador...</Typography>}
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Nome"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
                inputRef={field.ref}
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Telefone"
                value={formatPhone(field.value)}
                onChange={(e) => field.onChange(onlyDigits(e.target.value))}
                onBlur={field.onBlur}
                inputRef={field.ref}
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="is_active"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                label="Ativo"
                control={
                  <Switch
                    onBlur={field.onBlur}
                    checked={field.value}
                    onChange={(_, checked) => field.onChange(checked)}
                    slotProps={{ input: { ref: field.ref } }}
                  />
                }
              />
            )}
          />
          <Controller
            name="fee"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  },
                }}
                label="Taxa"
                value={field.value}
                onChange={(e) => field.onChange(onlyMoneyChars(e.target.value))}
                onBlur={field.onBlur}
                inputRef={field.ref}
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="vehicle_id"
            control={control}
            render={({ field, fieldState }) => (
              <Autocomplete
                options={vehicles}
                getOptionLabel={(v) => `${v.model} (${v.plate})`}
                value={findVehicle(vehicles, field.value)}
                onChange={(_, vehicle) => field.onChange(vehicleToId(vehicle))}
                onBlur={field.onBlur}
                loading={loadingVehicles}
                loadingText="Carregando veículos..."
                noOptionsText={vehiclesError ?? "Nenhum veículo encontrado"}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Veículo"
                    inputRef={field.ref}
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            )}
          />
          <Controller
            name="work_days"
            control={control}
            render={({ field, fieldState }) => (
              <Autocomplete
                disableCloseOnSelect
                multiple
                options={weekDays}
                getOptionLabel={(d) => d.label}
                value={findDays(field.value)}
                onChange={(_, day) => field.onChange(daysToIds(day))}
                onBlur={field.onBlur}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Dias de trabalho"
                    inputRef={field.ref}
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            )}
          />
          <Controller
            name="license_expires_at"
            control={control}
            render={({ field, fieldState }) => (
              <DatePicker
                disablePast
                label="Validade da CNH"
                value={stringToDate(field.value)}
                onChange={(date) => field.onChange(dateToString(date))}
                inputRef={field.ref}
                slotProps={{
                  textField: {
                    onBlur: field.onBlur,
                    error: fieldState.invalid,
                    helperText: fieldState.error?.message,
                    fullWidth: true,
                  },
                }}
              />
            )}
          />
          <Controller
            name="shift_start"
            control={control}
            render={({ field, fieldState }) => (
              <TimePicker
                ampm={false}
                label="Início do turno"
                value={stringToTime(field.value)}
                onChange={(date) => field.onChange(timeToString(date))}
                inputRef={field.ref}
                slotProps={{
                  textField: {
                    onBlur: field.onBlur,
                    error: fieldState.invalid,
                    helperText: fieldState.error?.message,
                    fullWidth: true,
                  },
                }}
              />
            )}
          />
          <Controller
            name="shift_end"
            control={control}
            render={({ field, fieldState }) => (
              <TimePicker
                ampm={false}
                label="Fim do turno"
                value={stringToTime(field.value)}
                onChange={(date) => field.onChange(timeToString(date))}
                inputRef={field.ref}
                slotProps={{
                  textField: {
                    onBlur: field.onBlur,
                    error: fieldState.invalid,
                    helperText: fieldState.error?.message,
                    fullWidth: true,
                  },
                }}
              />
            )}
          />
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Salvar
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
