import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { EquipmentsDrawer } from "../../modules/equipments/equipments-drawer";
import { EquipmentsList } from "../../modules/equipments/equipments-list";
import type { Equipment } from "../../typings/models/equipment.model";

export default function EquipmentsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [equipmentToEdit, setEquipmentToEdit] = useState<Equipment>();

  return (
    <Stack sx={{ gap: "24px", p: "24px" }}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h4">Gestão de equipamentos</Typography>
        <Button variant="contained" onClick={() => setIsDrawerOpen(true)}>
          Adicionar equipamento
        </Button>
      </Stack>

      <EquipmentsList
        refreshKey={refreshKey}
        onEdit={(equipmentToEdit) => {
          setEquipmentToEdit(equipmentToEdit);
          setIsDrawerOpen(true);
        }}
      />

      <EquipmentsDrawer
        equipment={equipmentToEdit}
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEquipmentToEdit(undefined);
        }}
        refreshList={() => setRefreshKey((k) => k + 1)}
      />
    </Stack>
  );
}
