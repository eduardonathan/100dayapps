import { Button, Stack, Typography } from "@mui/material";
import { CategoriesList } from "../../modules/categories/categories-list";
import { useState } from "react";
import type { Category } from "../../typings/models/category.model";
import { CategoriesDrawer } from "../../modules/categories/categories-drawer";

export default function CategoriesPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category>();

  return (
    <Stack sx={{ gap: "24px", p: "24px" }}>
      <Typography variant="h4">Gestão de categorias</Typography>
      <Button
        variant="contained"
        sx={{ alignSelf: "flex-start" }}
        onClick={() => setIsDrawerOpen(true)}
      >
        Adicionar categoria
      </Button>
      <CategoriesList
        onEdit={(category) => {
          setCategoryToEdit(category);
          setIsDrawerOpen(true);
        }}
      />
      <CategoriesDrawer
        open={isDrawerOpen}
        category={categoryToEdit}
        onClose={() => {
          setIsDrawerOpen(false);
          setCategoryToEdit(undefined);
        }}
      />
    </Stack>
  );
}
