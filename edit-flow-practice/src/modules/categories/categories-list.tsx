import { List, ListItemButton, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import type { Category } from "../../typings/models/category.model";
import { ListCategoriesUseCase } from "../../use-cases/categories/list-categories.use-case";

interface IProps {
  onEdit: (category: Category) => void;
}

export function CategoriesList(props: IProps) {
  const { onEdit } = props;

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function getCategories() {
      const data = await new ListCategoriesUseCase().handle();
      setCategories(data);
    }

    getCategories();
  }, []);

  return (
    <List>
      {categories.map((category) => (
        <ListItemButton key={category.id} onClick={() => onEdit(category)}>
          <ListItemText primary={category.name} />
        </ListItemButton>
      ))}
    </List>
  );
}
