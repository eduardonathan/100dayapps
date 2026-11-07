import { Drawer, Stack, TextField, Typography } from "@mui/material";
import type { Category } from "../../typings/models/category.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "A categoria precisa ter um nome válido")
    .max(50, "O nome deve ter no máximo 50 caracteres"),
});

type CategoryFormValues = z.infer<typeof schema>;

const EMPTY_VALUES: CategoryFormValues = {
  name: "",
};

interface IProps {
  open: boolean;
  onClose: () => void;
  category?: Category;
}

export function CategoriesDrawer(props: IProps) {
  const {
    control,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(schema),
    defaultValues: EMPTY_VALUES,
  });

  const { open, onClose, category } = props;
  const isEditing = !!category;

  useEffect(() => {
    if (!open) {
      reset(EMPTY_VALUES);
      return;
    }

    if (category) {
      reset({ name: category.name });
    }
  }, [open, category]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Stack sx={{ width: "400px", p: "24px", gap: "16px" }}>
        <Typography variant="h5">
          {isEditing ? "Editar categoria" : "Adicionar categoria"}
        </Typography>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Nome da categoria"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
      </Stack>
    </Drawer>
  );
}
