import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Drawer, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { CreateEquipmentUseCase } from "../../use-cases/equipments/create-equipment.use-case";
import type { Equipment } from "../../typings/models/equipment.model";
import { UpdateEquipmentUseCase } from "../../use-cases/equipments/update-equipment.use-case";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "O equipamento precisa ter um nome")
    .max(50, "O nome deve ter no máximo 50 caracteres"),
  serial_number: z
    .string()
    .trim()
    .min(1, "O número de série precisa ser preenchido")
    .max(20, "O número deve ter no máximo 20 caracteres"),
});

type EquipmentFormValues = z.infer<typeof schema>;

const EMPTY_VALUES: EquipmentFormValues = {
  name: "",
  serial_number: "",
};

interface IProps {
  equipment?: Equipment;
  open: boolean;
  onClose: () => void;
  refreshList: () => void;
}

export function EquipmentsDrawer(props: IProps) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EquipmentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: EMPTY_VALUES,
  });

  const { open, onClose, refreshList, equipment } = props;

  useEffect(() => {
    if (open) {
      if (equipment) {
        reset({ name: equipment.name, serial_number: equipment.serial_number });
      } else {
        reset(EMPTY_VALUES);
      }
    }
  }, [open, reset, equipment]);

  async function onSubmit(data: EquipmentFormValues) {
    try {
      if (equipment) {
        await new UpdateEquipmentUseCase().handle({
          id: equipment.id,
          name: data.name,
          serial_number: data.serial_number,
        });
      } else {
        await new CreateEquipmentUseCase().handle({
          name: data.name,
          serial_number: data.serial_number,
        });
      }
      onClose();
      refreshList();
    } catch (error) {
      console.log("Erro ao salvar seu equipamento", error);
    }
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Stack sx={{ width: "400px", p: "24px", gap: "16px" }}>
        <Typography variant="h5">
          {equipment ? "Editar equipamento" : "Adicionar equipamento"}
        </Typography>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Nome do equipamento"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="serial_number"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Número de série do equipamento"
              error={!!errors.serial_number}
              helperText={errors.serial_number?.message}
            />
          )}
        />
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Salvar
        </Button>
      </Stack>
    </Drawer>
  );
}
