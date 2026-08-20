import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, Clock, MapPin, MessageCircle, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { courses } from "@/lib/courses";
import {
  formatDatePtBR,
  generateSlotsForDate,
  isOpenOn,
  toIsoDate,
} from "@/lib/bookings";
import { createBooking, getBookedSlots } from "@/lib/bookings.functions";

const SCHOOL_ADDRESS = "Rua 2, 1145, entre avenidas 1 e 2 — Centro, Rio Claro/SP";
const WHATSAPP_NUMBER = "5500000000000"; // TODO: substituir pelo número real da escola

export const Route = createFileRoute("/agendar")({
  head: () => {
    const title = "Agendar matrícula presencial — Universo Educa+";
    const description =
      "Agende sua visita à escola para efetuar a matrícula presencial. Escolha o melhor dia e horário — Rua 2, 1145, Centro de Rio Claro.";
    const url = "https://universoeduca.buffallos.online/agendar";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: AgendarPage,
});

function buildDateOptions(days = 21): string[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const list: string[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = toIsoDate(d);
    if (isOpenOn(iso)) list.push(iso);
  }
  return list;
}

function AgendarPage() {
  const dateOptions = useMemo(() => buildDateOptions(28), []);
  const [selectedDate, setSelectedDate] = useState<string>(dateOptions[0] ?? "");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [courseSlug, setCourseSlug] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState<{ date: string; time: string } | null>(null);

  const queryClient = useQueryClient();
  const getBooked = useServerFn(getBookedSlots);
  const create = useServerFn(createBooking);

  const slotsQuery = useQuery({
    queryKey: ["booked-slots", selectedDate],
    queryFn: () => getBooked({ data: { date: selectedDate } }),
    enabled: Boolean(selectedDate),
    staleTime: 30_000,
  });

  const allSlots = useMemo(
    () => (selectedDate ? generateSlotsForDate(selectedDate) : []),
    [selectedDate],
  );
  const bookedSet = useMemo(
    () => new Set(slotsQuery.data?.booked ?? []),
    [slotsQuery.data],
  );

  const mutation = useMutation({
    mutationFn: async () =>
      create({
        data: {
          date: selectedDate,
          time: selectedTime,
          name,
          phone,
          email,
          courseSlug,
          notes,
        },
      }),
    onSuccess: () => {
      setConfirmed({ date: selectedDate, time: selectedTime });
      queryClient.invalidateQueries({ queryKey: ["booked-slots", selectedDate] });
      toast.success("Visita agendada! Enviamos sua confirmação pelo WhatsApp.");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Não foi possível agendar.";
      toast.error(msg);
      if (msg.includes("acabou de ser reservado")) {
        queryClient.invalidateQueries({ queryKey: ["booked-slots", selectedDate] });
        setSelectedTime("");
      }
    },
  });

  function whatsappLink(payload: { date: string; time: string }) {
    const courseName =
      courses.find((c) => c.slug === courseSlug)?.name ?? "curso a definir";
    const msg =
      `Olá! Acabei de agendar uma visita presencial para matrícula.\n\n` +
      `📅 ${formatDatePtBR(payload.date)}\n` +
      `⏰ ${payload.time}\n` +
      `👤 ${name}\n` +
      `📞 ${phone}\n` +
      `🎓 Curso: ${courseName}\n` +
      (notes ? `📝 ${notes}\n` : "") +
      `\nEndereço: ${SCHOOL_ADDRESS}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      toast.error("Escolha uma data e um horário.");
      return;
    }
    if (name.trim().length < 2 || phone.trim().length < 8) {
      toast.error("Preencha nome e telefone.");
      return;
    }
    mutation.mutate();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-navy text-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-orange/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange">
                <CalendarDays className="size-4" /> Matrícula presencial
              </span>
              <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-5xl">
                Agende sua visita e garanta sua vaga
              </h1>
              {/* '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''
                                        
                                            
                                            I have approved the plan */}
              <p className="mt-4 text-lg text-white/85">
                Escolha o dia e horário mais confortável. Nossa equipe estará
                pronta para receber você, tirar suas dúvidas e efetuar a matrícula
                presencialmente.
              </p>
              <ul className="mt-6 grid gap-2 text-sm text-white/90 sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-orange" /> Atendimento personalizado
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-orange" /> Conheça as instalações
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-orange" /> Condições exclusivas
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-orange" /> Sem compromisso
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Booking + info */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              {confirmed ? (
                <ConfirmedCard
                  date={confirmed.date}
                  time={confirmed.time}
                  whatsappHref={whatsappLink(confirmed)}
                  onNew={() => {
                    setConfirmed(null);
                    setSelectedTime("");
                    setName("");
                    setPhone("");
                    setEmail("");
                    setNotes("");
                  }}
                />
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8"
                >
                  {/* Date */}
                  <div>
                    <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy">
                      <CalendarDays className="size-5 text-orange" /> 1. Escolha o dia
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {dateOptions.slice(0, 14).map((iso) => {
                        const active = iso === selectedDate;
                        const [y, m, d] = iso.split("-").map(Number);
                        const date = new Date(y, m - 1, d);
                        const weekday = date
                          .toLocaleDateString("pt-BR", { weekday: "short" })
                          .replace(".", "");
                        return (
                          <button
                            key={iso}
                            type="button"
                            onClick={() => {
                              setSelectedDate(iso);
                              setSelectedTime("");
                            }}
                            className={`flex min-w-[76px] flex-col items-center rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${
                              active
                                ? "border-orange bg-orange text-orange-foreground"
                                : "border-border bg-background hover:border-orange/60"
                            }`}
                          >
                            <span className="text-[11px] uppercase tracking-wider opacity-80">
                              {weekday}
                            </span>
                            <span className="text-lg font-extrabold leading-tight">
                              {String(d).padStart(2, "0")}
                            </span>
                            <span className="text-[11px] opacity-80">
                              {date.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {selectedDate && (
                      <p className="mt-3 text-sm text-muted-foreground">
                        {formatDatePtBR(selectedDate)}
                      </p>
                    )}
                  </div>

                  {/* Time */}
                  <div>
                    <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy">
                      <Clock className="size-5 text-orange" /> 2. Escolha o horário
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Cada visita tem 30 minutos. Horários em cinza já estão ocupados.
                    </p>
                    <div className="mt-4">
                      {slotsQuery.isLoading ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Loader2 className="size-4 animate-spin" /> Carregando horários…
                        </div>
                      ) : allSlots.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Não há atendimento nessa data.
                        </p>
                      ) : (
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-6">
                          {allSlots.map((slot) => {
                            const taken = bookedSet.has(slot);
                            const active = slot === selectedTime;
                            return (
                              <button
                                key={slot}
                                type="button"
                                disabled={taken}
                                onClick={() => setSelectedTime(slot)}
                                className={`rounded-lg border px-2 py-2 text-sm font-semibold transition-colors ${
                                  taken
                                    ? "cursor-not-allowed border-border bg-muted text-muted-foreground line-through"
                                    : active
                                      ? "border-orange bg-orange text-orange-foreground"
                                      : "border-border bg-background hover:border-orange/60"
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Personal info */}
                  <div>
                    <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy">
                      <CheckCircle2 className="size-5 text-orange" /> 3. Seus dados
                    </h2>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="name">Nome completo *</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          maxLength={120}
                          required
                          placeholder="Seu nome"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">WhatsApp / Telefone *</Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          maxLength={30}
                          required
                          placeholder="(19) 9 9999-9999"
                          className="mt-1"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="email">E-mail (opcional)</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          maxLength={180}
                          placeholder="voce@email.com"
                          className="mt-1"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="course">Curso de interesse</Label>
                        <Select value={courseSlug} onValueChange={setCourseSlug}>
                          <SelectTrigger id="course" className="mt-1">
                            <SelectValue placeholder="Selecione um curso" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.map((c) => (
                              <SelectItem key={c.slug} value={c.slug}>
                                {c.name} · {c.modality}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="notes">Observações (opcional)</Label>
                        <Textarea
                          id="notes"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          maxLength={500}
                          placeholder="Alguma dúvida ou preferência?"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="cta"
                    size="lg"
                    className="w-full"
                    disabled={mutation.isPending || !selectedTime}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" /> Agendando…
                      </>
                    ) : (
                      <>
                        Confirmar agendamento <ArrowRight />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <aside className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-navy">
                  <MapPin className="size-5 text-orange" /> Endereço da escola
                </h3>
                <p className="mt-2 text-sm text-foreground/85">{SCHOOL_ADDRESS}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SCHOOL_ADDRESS)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-orange hover:underline"
                >
                  Ver no Google Maps <ArrowRight className="size-3.5" />
                </a>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-navy">
                  <Clock className="size-5 text-orange" /> Horários de atendimento
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-foreground/85">
                  <li>Segunda a sexta: 08h00 às 12h30 · 13h30 às 20h30</li>
                  <li>Sábado: 08h00 às 15h00</li>
                  <li>Domingo: fechado</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-navy p-6 text-white shadow-soft">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold">
                  <MessageCircle className="size-5 text-orange" /> Prefere pelo WhatsApp?
                </h3>
                <p className="mt-2 text-sm text-white/85">
                  Fale direto com um atendente e agende sua visita em segundos.
                </p>
                <Button asChild variant="cta" className="mt-4 w-full">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Quero agendar uma visita para matrícula.")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Chamar no WhatsApp
                  </a>
                </Button>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

function ConfirmedCard({
  date,
  time,
  whatsappHref,
  onNew,
}: {
  date: string;
  time: string;
  whatsappHref: string;
  onNew: () => void;
}) {
  return (
    <div className="rounded-2xl border border-success/40 bg-card p-8 shadow-elevated">
      <div className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="size-7" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-extrabold text-navy">
            Visita agendada!
          </h2>
          <p className="text-sm text-muted-foreground">
            Enviamos a confirmação para você levar no WhatsApp.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 rounded-xl bg-secondary p-5 text-sm">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4 text-orange" />
          <span className="font-semibold text-navy">{formatDatePtBR(date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-orange" />
          <span className="font-semibold text-navy">{time}</span>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 size-4 text-orange" />
          <span className="text-foreground/85">{SCHOOL_ADDRESS}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="cta" size="lg" className="flex-1">
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            <MessageCircle /> Enviar confirmação no WhatsApp
          </a>
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={onNew}>
          Fazer outro agendamento
        </Button>
      </div>
    </div>
  );
}
