export interface Plant {
  id: string;
  name: string;
  species: string;
  waterFrequencyDays: number;
  price: number;
}

export interface CreatePlantInput {
  name: string;
  species: string;
  waterFrequencyDays: number;
  price: number;
}

export interface UpdatePlantInput {
  id: string;
  name: string;
  species: string;
  waterFrequencyDays: number;
  price: number;
}

export interface ListPlantProps {
  search?: string;
  limit: number;
  offset: number;
}
