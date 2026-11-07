export interface Vehicle {
  id: number;
  plate: string;
  model: string;
}

export interface Driver {
  id: number;
  name: string;
  phone: string;
  license_expires_at: string;
  shift_start: string;
  shift_end: string;
  work_days: number[];
  vehicle: Vehicle | null;
  fee_per_delivery_cents: number;
  is_active: boolean;
  created_at: string;
}
