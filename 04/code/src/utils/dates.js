export const todayISO = () => new Date().toISOString().split("T")[0];

export function daysUntil(dateISO) {
  if (!dateISO) return Infinity;
  const start = new Date(new Date().toDateString()); 
  const end = new Date(dateISO + "T00:00:00");
  const diffMs = end - start;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function isDueSoon(dateISO) {
  const d = daysUntil(dateISO);
  return d >= 0 && d < 3;
}

export function isOverdue(dateISO) {
  return daysUntil(dateISO) < 0;
}