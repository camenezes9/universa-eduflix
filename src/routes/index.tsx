import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Award,
  UserCheck,
  Briefcase,
  BookOpen,
  Building2,
  CreditCard,
  Star,
  Quote,
  Sparkles,
  Users,
  ShieldCheck,
  Clock,
  ChevronRight,
  Play,
  Flame,
  CheckCircle2,
  Trophy,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { CourseCard } from "@/components/site/CourseCard";
import { FeaturedCourseCard } from "@/components/site/FeaturedCourseCard";
import { courses } from "@/lib/courses";
import heroImage from "@/assets/hero-students.jpg";
import massoterapiaImg from "@/assets/course-massoterapia.jpg";
import cuidadorImg from "@/assets/course-cuidador.jpg";
import alumni1Img from "@/assets/alumni-clinic-1.jpg";
import alumni2Img from "@/assets/alumni-clinic-2.jpg";
import alumni3Img from "@/assets/alumni-clinic-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Universo Educa+ — Cursos Profissionalizantes com 50% OFF" },
      {
        name: "description",
        content:
          "Cursos profissionalizantes presenciais e EAD com até 50% de desconto. Massoterapia, Cuidador de Idosos, Libras, Inglês e mais. Matrículas abertas 2026.",
      },
      { property: "og:title", content: "Universo Educa+ — Transforme Seu Futuro" },
      {
        property: "og:description",
        content:
          "Cursos profissionalizantes com 50% OFF. Certificação reconhecida, turmas reduzidas e bolsa de empregos.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

const promoHighlights = [
  {
    icon: Trophy,
    tag: "Sorteio mensal",
    title: "Concorra a 50% OFF na matrícula",
    desc: "Todo mês sorteamos descontos exclusivos entre matriculados.",
  },
  {
    icon: CreditCard,
    tag: "Pagamento facilitado",
    title: "10% à vista ou 12x sem juros no cartão",
    desc: "Escolha a forma que cabe no seu bolso, sem burocracia.",
  },
  {
    icon: ShieldCheck,
    tag: "Certificação nacional",
    title: "Diploma reconhecido em todo o Brasil",
    desc: "Válido para currículo, concursos e registro profissional.",
  },
  {
    icon: Flame,
    tag: "Vagas limitadas",
    title: "Turmas reduzidas — últimas vagas",
    desc: "Garanta a sua antes do fechamento da próxima turma.",
  },
];

function HeroPromoCard() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % promoHighlights.length), 4000);
    return () => clearInterval(id);
  }, []);
  const item = promoHighlights[i];
  const Icon = item.icon;
  return (
    <div className="pointer-events-auto w-full max-w-sm">
      <div
        key={i}
        className="animate-float rounded-2xl border border-white/25 bg-white/10 p-4 text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        style={{ WebkitBackdropFilter: "blur(20px)" }}
      >
        <div className="flex items-start gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-orange/90 text-orange-foreground shadow-lg">
            <Icon className="size-5" />
          </div>
          <div className="min-w-0">
            <span className="inline-block rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white/90">
              {item.tag}
            </span>
            <p className="mt-1.5 text-sm font-bold leading-snug">{item.title}</p>
            <p className="mt-1 text-xs text-white/75">{item.desc}</p>
          </div>
        </div>
        <div className="mt-3 flex gap-1.5">
          {promoHighlights.map((_, idx) => (
            <span
              key={idx}
              className={`h-1 flex-1 rounded-full transition-all ${
                idx === i ? "bg-orange" : "bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Estudantes em sala de aula da Universo Educa+"
          className="size-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="max-w-3xl text-white">
          <Badge className="animate-float border-0 bg-orange px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-foreground">
            🎓 Matrículas abertas 2026
          </Badge>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            Transforme Seu Futuro com{" "}
            <span className="text-orange">Profissões do Mercado</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85 sm:text-xl">
            Cursos profissionalizantes presenciais e EAD com até{" "}
            <strong className="text-orange">50% de desconto</strong>. Certificação
            reconhecida.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="cta" size="xl">
              <Link to="/cursos">Quero minha vaga com 50% OFF</Link>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <Link to="/cursos">Conhecer cursos</Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="size-8 rounded-full border-2 border-white bg-gradient-to-br from-orange to-navy"
                  />
                ))}
              </div>
              <span><strong className="text-white">+5.000</strong> alunos formados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5 text-orange">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <span><strong className="text-white">4.9/5</strong> em 328 avaliações</span>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-start lg:absolute lg:right-8 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:justify-end">
          <HeroPromoCard />
        </div>
      </div>
    </section>
  );
}


function Countdown() {
  const target = new Date(Date.now() + 3 * 86400000 + 5 * 3600000);
  const { d, h, m, s } = useCountdown(target);
  const items = [
    { v: d, l: "Dias" },
    { v: h, l: "Horas" },
    { v: m, l: "Min" },
    { v: s, l: "Seg" },
  ];
  return (
    <div className="flex gap-2 sm:gap-3">
      {items.map((it) => (
        <div
          key={it.l}
          className="min-w-14 rounded-xl bg-white/95 px-3 py-2 text-center shadow-soft sm:min-w-16 sm:px-4 sm:py-3"
        >
          <div className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
            {String(it.v).padStart(2, "0")}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {it.l}
          </div>
        </div>
      ))}
    </div>
  );
}

const featuredContent: Record<
  string,
  { tagline: string; highlights: string[]; income: string; image: string }
> = {
  massoterapia: {
    tagline: "Profissão com liberdade",
    income: "R$ 3.000 a R$ 8.000/mês",
    image: massoterapiaImg,
    highlights: [
      "Trabalhe por conta própria: atenda em domicílio, em spas ou monte seu consultório",
      "Sessões cobradas de R$ 80 a R$ 200 — poucos clientes por dia já geram alta renda",
      "Aulas 100% práticas em macas profissionais, do relaxamento à drenagem linfática",
      "Mercado em expansão: bem-estar é uma das áreas que mais cresce no Brasil",
    ],
  },
  "cuidador-de-idosos": {
    tagline: "Empregabilidade garantida",
    income: "R$ 2.500 a R$ 5.000/mês",
    image: cuidadorImg,
    highlights: [
      "Área com falta de profissionais qualificados — vagas abertas o ano inteiro",
      "Atue em domicílio, hospitais, clínicas ou como cuidador particular autônomo",
      "Diárias e plantões que podem ultrapassar R$ 300 para profissionais capacitados",
      "Formação humanizada com primeiros socorros, nutrição e cuidados especializados",
    ],
  },
};

function Presencial() {
  const featured = courses.filter((c) => featuredContent[c.slug]);
  const rest = courses.filter((c) => c.modality === "Presencial" && !featuredContent[c.slug]);
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="secondary" className="border-orange/20 bg-orange/10 text-orange">
          <Flame className="mr-1 size-3" /> Mais procurados
        </Badge>
        <h2 className="mt-4 font-display text-3xl font-extrabold text-navy sm:text-4xl">
          Cursos Presenciais em Destaque
        </h2>
        <p className="mt-3 text-muted-foreground">
          Formações que mudam vidas — com alta demanda e potencial de renda comprovado.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {featured.map((c) => (
          <FeaturedCourseCard key={c.slug} course={c} content={featuredContent[c.slug]} />
        ))}
      </div>

      <div className="mt-14">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h3 className="font-display text-xl font-bold text-navy sm:text-2xl">
            Outros cursos presenciais
          </h3>
          <div className="hidden h-px flex-1 bg-border sm:block" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {rest.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </div>
    </section>
  );
}


function EAD() {
  const list = courses.filter((c) => c.modality === "EAD");
  return (
    <section className="bg-secondary py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="border-0 bg-navy text-navy-foreground">100% Online</Badge>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-navy sm:text-4xl">
            Estude Online no Seu Ritmo — Cursos EAD
          </h2>
          <p className="mt-3 text-muted-foreground">
            Certificado reconhecido, acesso 24/7 e suporte de tutores.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="cta" size="xl">
            <Link to="/cursos">Ver todos os cursos <ChevronRight /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Ana Paula",
    course: "Massoterapia",
    text: "Aulas 100% práticas! Antes de terminar o curso já tinha clientes fixos. A escola mudou minha vida.",
  },
  {
    name: "Carlos Eduardo",
    course: "Cuidador de Idosos",
    text: "Consegui meu primeiro emprego na área com o apoio da bolsa de empregos da escola. Recomendo demais!",
  },
  {
    name: "Juliana Souza",
    course: "Cílios e Sobrancelhas",
    text: "Professoras incríveis e material super atualizado. Hoje tenho meu próprio estúdio de beleza.",
  },
];

function Testimonials() {
  return (
    <section id="depoimentos" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
          Quem estuda na Universo Educa+ recomenda
        </h2>
        <p className="mt-3 text-muted-foreground">
          Histórias reais de quem transformou o futuro com a gente.
        </p>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <div key={i} className="card-hover relative rounded-2xl border border-border bg-card p-7 shadow-soft">
            <Quote className="absolute right-5 top-5 size-10 text-orange/15" />
            <div className="flex gap-0.5 text-orange">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="size-4 fill-current" />
              ))}
            </div>
            <p className="mt-4 text-foreground/85">"{t.text}"</p>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <div className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-navy to-orange text-white font-bold">
                {t.name[0]}
              </div>
              <div>
                <div className="font-display font-bold text-navy">{t.name}</div>
                <div className="text-xs text-muted-foreground">Curso de {t.course}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="group relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-navy via-navy/80 to-orange/60 shadow-soft"
          >
            <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_40%,white_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid size-16 place-items-center rounded-full bg-white/95 shadow-elevated transition-transform group-hover:scale-110">
                <Play className="size-6 translate-x-0.5 fill-navy text-navy" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-white/80">
                Depoimento em vídeo
              </div>
              <div className="text-sm font-semibold text-white">
                Turma de {["Massoterapia", "Libras", "Manicure"][i - 1]} — 2026/1
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const alumniBusinesses = [
  {
    name: "Camila Ribeiro",
    business: "Espaço Camila Terapias",
    neighborhood: "Cidade Jardim — Rio Claro",
    image: alumni1Img,
    course: "Massoterapia",
    year: "Formada em 2019",
    quote:
      "Comecei atendendo em casa depois do curso. Hoje tenho meu espaço próprio, agenda cheia e duas colaboradoras.",
    stats: [
      { label: "Clientes/mês", value: "180+" },
      { label: "Anos no mercado", value: "5" },
    ],
  },
  {
    name: "Renata Oliveira",
    business: "Renata Massoterapia & Relax",
    neighborhood: "Centro — Rio Claro",
    image: alumni2Img,
    course: "Massoterapia + Especializações",
    year: "Formada em 2017",
    quote:
      "A escola me deu técnica e confiança. Abri minha clínica no centro e hoje faturo mais do que sonhei quando comecei.",
    stats: [
      { label: "Faturamento", value: "R$ 15k/mês" },
      { label: "Salas de atendimento", value: "3" },
    ],
  },
  {
    name: "Patrícia Almeida",
    business: "Bem-Estar Studio",
    neighborhood: "Jardim América — Rio Claro",
    image: alumni3Img,
    course: "Massoterapia",
    year: "Formada em 2020",
    quote:
      "Larguei o trabalho CLT no primeiro ano como massoterapeuta autônoma. Hoje meu studio é referência no bairro.",
    stats: [
      { label: "Avaliação Google", value: "4,9 ★" },
      { label: "Retorno de clientes", value: "92%" },
    ],
  },
];

function AlumniBusiness() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/40 to-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange">
            <Trophy className="size-4" /> Ex-alunas de sucesso
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-navy sm:text-4xl">
            De aluna a dona do próprio negócio
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Conheça 3 clínicas de massoterapia hoje <strong className="text-navy">conceituadas em Rio Claro</strong> — todas comandadas por ex-alunas da Universo Educa+.
            O próximo case de sucesso pode ser o seu.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {alumniBusinesses.map((a) => (
            <article
              key={a.name}
              className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={a.image}
                  alt={`${a.name}, proprietária do ${a.business}`}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-orange px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-foreground shadow-elevated">
                  <Sparkles className="size-3.5" /> Case real
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div className="font-display text-xl font-extrabold leading-tight">
                    {a.business}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-white/85">
                    <MapPin className="size-3.5" /> {a.neighborhood}
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-display font-bold text-navy">{a.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {a.course} · {a.year}
                    </div>
                  </div>
                </div>

                <Quote className="mt-4 size-6 text-orange/40" />
                <p className="mt-1 text-sm italic text-foreground/85">
                  "{a.quote}"
                </p>

                <div className="mt-auto grid grid-cols-2 gap-3 border-t border-border pt-5">
                  {a.stats.map((s) => (
                    <div key={s.label} className="rounded-xl bg-secondary/70 p-3 text-center">
                      <div className="font-display text-lg font-extrabold text-navy">
                        {s.value}
                      </div>
                      <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA card */}
        <div className="mt-12 overflow-hidden rounded-2xl bg-gradient-to-br from-navy via-navy to-navy/90 p-8 text-white shadow-elevated sm:p-12">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-orange/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange">
                <TrendingUp className="size-4" /> Seu futuro começa aqui
              </div>
              <h3 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">
                Da sala de aula ao seu próprio consultório
              </h3>
              <p className="mt-2 max-w-2xl text-white/85">
                Todo mês formamos novos empreendedores da saúde e do bem-estar. Aprenda a técnica, monte sua marca e conquiste sua clientela — a Universo Educa+ te acompanha em cada etapa.
              </p>
            </div>
            <Button asChild variant="cta" size="xl">
              <Link to="/agendar">
                Quero ser o próximo case <ChevronRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const benefits = [
  { icon: Award, title: "Certificação Reconhecida", desc: "Certificado válido em todo território nacional." },
  { icon: UserCheck, title: "Professores Experientes", desc: "Docentes atuantes no mercado de trabalho." },
  { icon: Briefcase, title: "Bolsa de Empregos", desc: "Indicações para vagas parceiras da escola." },
  { icon: BookOpen, title: "Material Incluso", desc: "Apostilas e materiais didáticos sem custo extra." },
  { icon: Building2, title: "Infraestrutura Moderna", desc: "Salas equipadas para aulas 100% práticas." },
  { icon: CreditCard, title: "Pagamento Facilitado", desc: "Parcele em até 12x no cartão ou boleto." },
];

function WhyUs() {
  return (
    <section className="bg-gradient-to-br from-secondary via-background to-secondary py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
            Por que escolher a Universo Educa+?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tudo o que você precisa para uma formação de excelência.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="card-hover rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-navy to-navy/70 text-white">
                  <Icon className="size-7" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-navy">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Urgency() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 bg-[image:var(--gradient-orange)]" />
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_50%,white_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="text-white">
          <Badge className="border-0 bg-white/20 text-white backdrop-blur">
            <Flame className="mr-1 size-3" /> Oferta relâmpago
          </Badge>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Não perca tempo — vagas limitadas!
          </h2>
          <p className="mt-4 text-white/90">
            Apenas <strong>12 vagas</strong> para Massoterapia com 50% OFF. Garanta a sua antes que acabe.
          </p>
          <div className="mt-6 flex flex-col gap-3 text-sm font-semibold text-white">
            <span className="flex items-center gap-2"><CheckCircle2 className="size-5" /> Matrícula com 50% OFF</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="size-5" /> Primeiro mês grátis</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="size-5" /> Material didático incluso</span>
          </div>
          <div className="mt-8">
            <Button asChild variant="hero" size="xl">
              <Link to="/cursos">Garantir minha vaga agora</Link>
            </Button>
          </div>
        </div>
        <div className="rounded-3xl border-2 border-white/40 bg-white/10 p-8 backdrop-blur">
          <div className="text-center text-white">
            <div className="text-sm font-bold uppercase tracking-widest text-white/80">
              A oferta termina em
            </div>
            <div className="mt-4 flex justify-center">
              <Countdown />
            </div>
            <div className="mt-8 rounded-2xl bg-white/95 p-6 text-navy">
              <div className="text-xs font-bold uppercase tracking-widest text-orange">
                Turmas com poucas vagas
              </div>
              <ul className="mt-3 space-y-3 text-sm">
                {[
                  { c: "Massoterapia", left: 12 },
                  { c: "Libras", left: 5 },
                  { c: "Cuidador de Idosos", left: 8 },
                ].map((r) => (
                  <li key={r.c} className="flex items-center justify-between">
                    <span className="font-semibold">{r.c}</span>
                    <span className="rounded-full bg-orange/10 px-3 py-1 text-xs font-bold text-orange">
                      {r.left} vagas
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const steps = [
  { icon: Sparkles, title: "Escolha seu curso", desc: "Navegue pelo catálogo e encontre a formação ideal." },
  { icon: Users, title: "Faça sua matrícula", desc: "Online ou presencialmente, é rápido e seguro." },
  { icon: CreditCard, title: "Escolha o pagamento", desc: "Cartão em até 12x, boleto ou Pix." },
  { icon: Trophy, title: "Comece a estudar", desc: "Acesse as aulas e transforme seu futuro." },
];

function Steps() {
  return (
    <section id="matricula" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
          Como se matricular
        </h2>
        <p className="mt-3 text-muted-foreground">Simples, rápido e 100% seguro.</p>
      </div>
      <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="relative text-center">
              <div className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-navy to-orange text-white shadow-elevated">
                <Icon className="size-8" />
              </div>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-xs font-black text-orange shadow-soft">
                PASSO {i + 1}
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-navy">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "Quais formas de pagamento vocês aceitam?",
    a: "Aceitamos cartão de crédito (até 12x sem juros), boleto bancário, Pix e dinheiro. Consulte condições especiais com nossos consultores.",
  },
  {
    q: "Qual a duração dos cursos?",
    a: "A duração varia de 2 a 12 meses, dependendo da carga horária e complexidade. Todos com aulas semanais e materiais inclusos.",
  },
  {
    q: "O certificado é reconhecido?",
    a: "Sim! Nossa certificação é reconhecida em todo território nacional e válida para o mercado de trabalho.",
  },
  {
    q: "Quais os horários das aulas?",
    a: "Oferecemos turmas nos períodos manhã, tarde e noite, além dos sábados. Você escolhe o que se encaixa na sua rotina.",
  },
  {
    q: "Preciso ter conhecimento prévio?",
    a: "Não. Nossos cursos são preparados para iniciantes e você aprende do zero, com professores especializados.",
  },
];

function FAQ() {
  return (
    <section id="faq" className="bg-secondary py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
            Perguntas frequentes
          </h2>
          <p className="mt-3 text-muted-foreground">Tire suas dúvidas antes de se matricular.</p>
        </div>
        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-xl border border-border bg-card px-5 shadow-soft"
            >
              <AccordionTrigger className="font-display text-base font-bold text-navy hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-[image:var(--gradient-cta)]" />
      <div className="relative mx-auto max-w-4xl px-4 text-center text-white sm:px-6 lg:px-8">
        <h2 className="font-display text-4xl font-extrabold sm:text-5xl">
          Pronto para mudar de vida?
        </h2>
        <p className="mt-4 text-lg text-white/90">
          Matricule-se hoje e ganhe <strong className="text-orange">50% de desconto</strong> na sua formação.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="cta" size="xl">
            <Link to="/cursos">Quero me matricular agora</Link>
          </Button>
          <Button asChild variant="outlineLight" size="xl">
            <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer">
              Falar com consultor
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const stats = [
    { icon: Users, v: "+5.000", l: "Alunos formados" },
    { icon: Star, v: "4.9/5", l: "Avaliação dos alunos" },
    { icon: ShieldCheck, v: "12+", l: "Anos de experiência" },
    { icon: Clock, v: "12x", l: "Sem juros no cartão" },
  ];
  return (
    <section className="border-b border-border bg-background py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.l} className="flex items-center gap-3">
              <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-orange/10 text-orange">
                <Icon className="size-6" />
              </div>
              <div className="min-w-0">
                <div className="font-display text-xl font-extrabold text-navy sm:text-2xl">
                  {s.v}
                </div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />

        <SocialProof />
        <Presencial />
        <EAD />
        <Testimonials />
        <AlumniBusiness />
        <WhyUs />
        <Urgency />
        <Steps />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
