import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { CourseCard } from "@/components/site/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/lib/courses";

export const Route = createFileRoute("/cursos/")({
  head: () => {
    const title = "Catálogo de Cursos Profissionalizantes — Universo Educa+";
    const description =
      "Explore todos os cursos profissionalizantes presenciais e EAD da Universo Educa+ em Rio Claro. Filtre por modalidade, área e encontre o curso ideal com 50% OFF.";
    const url = "https://universoeduca.buffallos.online/cursos";
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
  component: CoursesPage,
});

type Modality = "Todos" | "Presencial" | "EAD";
const areas = ["Todas", "Saúde", "Beleza", "Educação", "Administração", "Idiomas", "Serviços"] as const;

function CoursesPage() {
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<Modality>("Todos");
  const [area, setArea] = useState<(typeof areas)[number]>("Todas");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      if (mod !== "Todos" && c.modality !== mod) return false;
      if (area !== "Todas" && c.area !== area) return false;
      if (q && !c.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, mod, area]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-navy py-14 text-navy-foreground sm:py-20">
          <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_30%,white_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Badge className="border-0 bg-orange text-orange-foreground">Catálogo completo</Badge>
            <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
              Encontre o curso ideal para você
            </h1>
            <p className="mt-3 max-w-3xl text-white/85">
              Cursos presenciais e EAD com certificação reconhecida. Em <strong>Rio Claro</strong>, todas as aulas presenciais e cursos online são realizados na sede em computadores locais; em <strong>Santa Bárbara d'Oeste e Sumaré</strong>, cursos presenciais dentro da Faculdade Anhanguera.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar curso pelo nome..."
                  className="pl-9"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {(["Todos", "Presencial", "EAD"] as Modality[]).map((m) => (
                  <Button
                    key={m}
                    variant={mod === m ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMod(m)}
                  >
                    {m}
                  </Button>
                ))}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {areas.map((a) => (
                <button
                  key={a}
                  onClick={() => setArea(a)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    area === a
                      ? "border-navy bg-navy text-navy-foreground"
                      : "border-border bg-background text-foreground/70 hover:border-navy/50"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-sm text-muted-foreground">
            {filtered.length} curso{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
          </div>

          {filtered.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-border p-16 text-center text-muted-foreground">
              Nenhum curso encontrado com esses filtros.
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((c) => (
                <CourseCard key={c.slug} course={c} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
