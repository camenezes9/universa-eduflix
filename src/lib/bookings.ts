// Shared helpers for visit scheduling (safe to import from client and server).

export type SlotInterval = { start: string; end: string }; // "HH:MM"

// School opening hours per weekday (0 = Sunday ... 6 = Saturday)
export const OPENING_HOURS: Record<number, SlotInterval[]> = {
  0: [], // Domingo
  1: [{ start: "08:00", end: "12:30" }, { start: "13:30", end: "20:30" }],
  2: [{ start: "08:00", end: "12:30" }, { start: "13:30", end: "20:30" }],
  3: [{ start: "08:00", end: "12:30" }, { start: "13:30", end: "20:30" }],
  4: [{ start: "08:00", end: "12:30" }, { start: "13:30", end: "20:30" }],
  5: [{ start: "08:00", end: "12:30" }, { start: "13:30", end: "20:30" }],
  6: [{ start: "08:00", end: "15:00" }],
};

export const SLOT_MINUTES = 30;
export const VISIT_DURATION_MINUTES = 30;

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}
function toHHMM(mins: number) {
  const h = String(Math.floor(mins / 60)).padStart(2, "0");
  const m = String(mins % 60).padStart(2, "0");
  return `${h}:${m}`;
}

/** Returns "HH:MM" slot start times for a given ISO date (YYYY-MM-DD). */
export function generateSlotsForDate(isoDate: string): string[] {
  // Parse as local date to avoid TZ off-by-one
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const weekday = date.getDay();
  const intervals = OPENING_HOURS[weekday] ?? [];
  const slots: string[] = [];
  for (const iv of intervals) {
    const startM = toMinutes(iv.start);
    const endM = toMinutes(iv.end);
    for (let t = startM; t + VISIT_DURATION_MINUTES <= endM; t += SLOT_MINUTES) {
      slots.push(toHHMM(t));
    }
  }
  return slots;
}

export function isOpenOn(isoDate: string): boolean {
  return generateSlotsForDate(isoDate).length > 0;
}

export function formatDatePtBR(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
