import { useEffect, useState } from "react";
import type { Equipment } from "../../typings/models/equipment.model";
import { ListEquipmentsUseCase } from "../../use-cases/equipments/list-equipments.use-case";
import { List, ListItemButton, ListItemText } from "@mui/material";

interface IProps {
  refreshKey: number;
  onEdit: (equipment: Equipment) => void;
}

export function EquipmentsList(props: IProps) {
  const { refreshKey, onEdit } = props;
  const [equipments, setEquipments] = useState<Equipment[]>([]);

  useEffect(() => {
    let canceled = false;

    async function getEquipments() {
      try {
        const data = await new ListEquipmentsUseCase().handle();
        if (!canceled) {
          setEquipments(data);
        }
      } catch (error) {
        console.log("Erro ao buscar equipamentos", error);
      }
    }

    getEquipments();

    return () => {
      canceled = true;
    };
  }, [refreshKey]);

  return (
    <List>
      {equipments.map((equipment) => (
        <ListItemButton key={equipment.id} onClick={() => onEdit(equipment)}>
          <ListItemText
            primary={equipment.name}
            secondary={equipment.serial_number}
          />
        </ListItemButton>
      ))}
    </List>
  );
}
