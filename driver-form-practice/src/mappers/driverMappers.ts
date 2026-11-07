import type { CreateDriverInputProps } from "../api/use-cases/create-driver.use-case";
import type { DriverFormValues } from "../schemas/driverFormSchema";
import type { Driver } from "../types/Driver";

export function toPayload(values: DriverFormValues): CreateDriverInputProps {
  return {
    name: values.name,
    phone: values.phone,
    license_expires_at: values.license_expires_at,
    shift_start: `${values.shift_start}:00`,
    shift_end: `${values.shift_end}:00`,
    work_days: values.work_days,
    vehicle_id: values.vehicle_id,
    fee_per_delivery_cents: Math.round(
      Number(values.fee.replace(",", ".")) * 100,
    ),
    is_active: values.is_active,
  };
}

export function toFormValues(driver: Driver): DriverFormValues {
  return {
    name: driver.name,
    phone: driver.phone,
    license_expires_at: driver.license_expires_at,
    shift_start: driver.shift_start.slice(0, 5),
    shift_end: driver.shift_end.slice(0, 5),
    work_days: driver.work_days,
    vehicle_id: driver.vehicle?.id ?? null,
    fee: (driver.fee_per_delivery_cents / 100).toFixed(2).replace(".", ","),
    is_active: driver.is_active,
  };
}
