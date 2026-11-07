export function maskDate(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);

  let result = day;
  if (month) result += `/${month}`;
  if (year) result += `/${year}`;
  return result;
}

export function maskTime(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  const hours = digits.slice(0, 2);
  const minutes = digits.slice(2, 4);

  let result = hours;
  if (minutes) result += `:${minutes}`;
  return result;
}

export function isCompleteDate(value: string): boolean {
  return /^\d{2}\/\d{2}\/\d{4}$/.test(value);
}

export function isCompleteTime(value: string): boolean {
  return /^\d{2}:\d{2}$/.test(value);
}
