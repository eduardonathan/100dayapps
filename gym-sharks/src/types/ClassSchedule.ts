export interface ClassSchedule {
  id: string;
  modality: string;
  instructor: string;
  time: string;
  /** Total de lugares na turma. */
  capacity: number;
  /** Lugares já ocupados. `vagas livres` = capacity - enrolled. */
  enrolled: number;
}
