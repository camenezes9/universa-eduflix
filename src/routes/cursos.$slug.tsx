import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, GraduationCap, Users, Award, Calendar, Sparkles, TrendingUp } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { CourseCard } from "@/components/site/CourseCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { courses, getCourse, upsells } from "@/lib/courses";

export const Route = createFileRoute("/cursos/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Curso não encontrado — Universo Educa+" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const c = loaderData.course;
    const title = `${c.name} — ${c.modality} | Universo Educa+`;
    const desc = `${c.short} Duração: ${c.duration}. A partir de R$ ${c.price}/mês.`;
    const url = `https://universoeduca.buffallos.online/cursos/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: CourseDetail,
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-navy">Curso não encontrado</h1>
        <p className="mt-3 text-muted-foreground">O curso que você procura não existe ou foi movido.</p>
        <Button asChild variant="cta" className="mt-6">
          <Link to="/cursos">Ver todos os cursos</Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
}

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const Icon = course.icon;
  const suggestions = (upsells[course.slug] ?? [])
    .map((u) => ({ ...u, course: getCourse(u.slug) }))
    .filter((u): u is { slug: string; reason: string; course: NonNullable<ReturnType<typeof getCourse>> } => Boolean(u.course));
  const related = courses
    .filter(
      (c) => c.area === course.area && c.slug !== course.slug && !suggestions.some((s) => s.slug === c.slug),
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-navy text-navy-foreground">
          <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
          <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_20%_50%,white_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <Link to="/cursos" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
              <ArrowLeft className="size-4" /> Voltar aos cursos
            </Link>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border-0 bg-orange text-orange-foreground">{course.modality}</Badge>
                  {course.badge && (
                    <Badge className={`border-0 ${course.badge === "NOVO" ? "bg-success text-white" : "bg-white text-navy"}`}>
                      {course.badge}
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-white/10 text-white">{course.area}</Badge>
                </div>
                <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">{course.name}</h1>
                <p className="mt-4 max-w-2xl text-lg text-white/85">{course.description}</p>
              </div>
              <div className="hidden size-32 place-items-center rounded-3xl bg-white/10 backdrop-blur lg:grid">
                <Icon className="size-16 text-white" strokeWidth={1.6} />
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-elevated sm:grid-cols-2 lg:grid-cols-4">

            {[
              { icon: Clock, l: "Duração", v: course.duration },
              { icon: GraduationCap, l: "Carga horária", v: course.hours },
              { icon: Calendar, l: "Próxima turma", v: course.nextClass },
              { icon: Award, l: "Certificação", v: "Reconhecida" },
            ].map((s) => {
              const I = s.icon;
              return (
                <div key={s.l} className="flex items-center gap-3">
                  <div className="grid size-11 place-items-center rounded-xl bg-orange/10 text-orange">
                    <I className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">{s.l}</div>
                    <div className="font-display font-bold text-navy">{s.v}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-navy">O que você vai aprender</h2>
              <ul className="mt-5 space-y-3">
                {course.learn.map((l: string) => (
                  <li key={l} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-orange" />
                    <span className="text-foreground/85">{l}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-extrabold text-navy">Para quem é este curso</h2>
              <p className="mt-3 text-foreground/80">{course.audience}</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-extrabold text-navy">Certificação</h2>
              <p className="mt-3 text-foreground/80">
                Ao concluir o curso, você recebe certificado reconhecido em todo território nacional,
                válido para o mercado de trabalho e para incluir no seu currículo.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-extrabold text-navy">Perguntas frequentes</h2>
              <Accordion type="single" collapsible className="mt-4 space-y-3">
                {[
                  { q: "Preciso ter conhecimento prévio?", a: "Não. O curso é preparado para iniciantes." },
                  { q: "Como funciona o certificado?", a: "Após concluir todas as etapas com aproveitamento, o certificado é emitido em até 30 dias." },
                  { q: "Posso trancar a matrícula?", a: "Sim. Entre em contato com a secretaria para orientações." },
                ].map((f, i) => (
                  <AccordionItem key={i} value={`f-${i}`} className="rounded-xl border border-border bg-card px-5 shadow-soft">
                    <AccordionTrigger className="font-display font-bold text-navy hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-elevated">
              <div className="text-sm text-muted-foreground line-through">De R$ {course.originalPrice}/mês</div>
              <div className="mt-1 font-display text-4xl font-extrabold text-navy">
                R$ {course.price}
                <span className="text-base font-semibold text-muted-foreground">/mês</span>
              </div>
              <div className="mt-2 inline-flex items-center rounded-full bg-orange/10 px-3 py-1 text-xs font-bold text-orange">
                50% OFF na matrícula
              </div>
              <div className="mt-6 space-y-3">
                <Button variant="cta" size="xl" className="w-full" asChild>
                  <Link to="/agendar">Matricule-se agora</Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer">
                    Falar com consultor
                  </a>
                </Button>
              </div>
              <ul className="mt-6 space-y-2 border-t border-border pt-5 text-sm text-foreground/80">
                <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-success" /> Parcele em até 12x no cartão</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-success" /> Material didático incluso</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-success" /> Certificação reconhecida nacionalmente</li>
                <li className="flex items-center gap-2"><Users className="size-4 text-navy" /> Turmas reduzidas</li>
              </ul>
            </div>
          </aside>
        </section>

        {suggestions.length > 0 && (
          <section className="bg-gradient-to-b from-cream/40 to-background py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange">
                  <TrendingUp className="size-3.5" /> Potencialize seu currículo
                </div>
                <h2 className="mt-4 font-display text-3xl font-extrabold text-navy sm:text-4xl">
                  Vá além do {course.name}
                </h2>
                <p className="mt-3 text-foreground/75">
                  Quem se destaca no mercado combina formações. Veja como estes cursos se somam ao seu
                  para abrir mais portas, aumentar a renda e diferenciar seu trabalho.
                </p>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {suggestions.map(({ course: sc, reason }) => {
                  const SIcon = sc.icon;
                  return (
                    <article
                      key={sc.slug}
                      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:shadow-elevated sm:flex-row"
                    >
                      <div className="relative h-44 shrink-0 sm:h-auto sm:w-44">
                        <img
                          src={sc.image}
                          alt={sc.name}
                          loading="lazy"
                          width={512}
                          height={512}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-navy/10" />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-center gap-2">
                          <div className="grid size-9 place-items-center rounded-lg bg-navy/5 text-navy">
                            <SIcon className="size-4.5" strokeWidth={1.8} />
                          </div>
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-orange">
                              Combine com
                            </div>
                            <h3 className="font-display text-lg font-bold text-navy">{sc.name}</h3>
                          </div>
                        </div>
                        <p className="mt-3 flex-1 text-sm text-foreground/75">
                          <Sparkles className="mr-1.5 inline size-3.5 text-orange" />
                          {reason}
                        </p>
                        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                          <div>
                            <div className="text-[11px] text-muted-foreground">a partir de</div>
                            <div className="font-display text-lg font-extrabold text-navy">
                              R$ {sc.price}
                              <span className="text-xs font-semibold text-muted-foreground">/mês</span>
                            </div>
                          </div>
                          <Button asChild variant="outline" size="sm">
                            <Link to="/cursos/$slug" params={{ slug: sc.slug }}>
                              Conhecer <ArrowRight className="size-3.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mt-8 rounded-2xl border border-dashed border-orange/40 bg-orange/5 p-5 text-sm text-foreground/80 sm:flex sm:items-center sm:justify-between sm:gap-4">
                <p>
                  <strong className="text-navy">Alunos que combinam formações</strong> conseguem melhores
                  vagas e ticket médio maior. Fale com um consultor sobre condições especiais para dois ou
                  mais cursos.
                </p>
                <Button asChild variant="cta" size="sm" className="mt-3 shrink-0 sm:mt-0">
                  <Link to="/agendar">Agendar visita</Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-extrabold text-navy">Outros cursos da mesma área</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((c) => (
                <CourseCard key={c.slug} course={c} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
