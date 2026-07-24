import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateSlotsForDate } from "./bookings";

const dateSchema = z
  .object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida") })
  .strict();

export const getBookedSlots = createServerFn({ method: "GET" })
  .inputValidator((input: { date: string }) => dateSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("visit_bookings")
      .select("visit_time")
      .eq("visit_date", data.date);
    if (error) throw new Error(error.message);
    const booked = (rows ?? []).map((r) => (r.visit_time as string).slice(0, 5));
    return { date: data.date, booked, all: generateSlotsForDate(data.date) };
  });

const bookingSchema = z
  .object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
    time: z.string().regex(/^\d{2}:\d{2}$/, "Horário inválido"),
    name: z.string().trim().min(2, "Informe seu nome").max(120),
    phone: z.string().trim().min(8, "Telefone inválido").max(30),
    email: z.string().trim().email("E-mail inválido").max(180).optional().or(z.literal("")),
    courseSlug: z.string().trim().max(80).optional().or(z.literal("")),
    notes: z.string().trim().max(500).optional().or(z.literal("")),
  })
  .strict();

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    // Validate that the slot is legit for the chosen weekday.
    const legalSlots = generateSlotsForDate(data.date);
    if (!legalSlots.includes(data.time)) {
      throw new Error("Horário indisponível para essa data.");
    }
    // Reject past dates.
    const now = new Date();
    const [y, m, d] = data.date.split("-").map(Number);
    const [hh, mm] = data.time.split(":").map(Number);
    const slotDate = new Date(y, m - 1, d, hh, mm);
    if (slotDate.getTime() < now.getTime()) {
      throw new Error("Não é possível agendar um horário no passado.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: inserted, error } = await supabaseAdmin
      .from("visit_bookings")
      .insert({
        visit_date: data.date,
        visit_time: data.time,
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        course_slug: data.courseSlug || null,
        notes: data.notes || null,
      })
      .select("id")
      .single();

    if (error) {
      // Unique violation → slot taken
      if ((error as { code?: string }).code === "23505") {
        throw new Error("Esse horário acabou de ser reservado. Escolha outro.");
      }
      throw new Error(error.message);
    }
    return { id: inserted!.id, date: data.date, time: data.time };
  });
