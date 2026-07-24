import { Link } from "@tanstack/react-router";
import { Clock, ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import type { Course } from "@/lib/courses";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type FeaturedContent = {
  tagline: string;
  highlights: string[];
  income: string;
};

export function FeaturedCourseCard({
  course,
  content,
}: {
  course: Course;
  content: FeaturedContent;
}) {
  const Icon = course.icon;
  return (
    <div className="card-hover group relative overflow-hidden rounded-3xl border border-border bg-card shadow-elevated">
      <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        {/* Visual side */}
        <div className="relative min-h-56 overflow-hidden bg-gradient-to-br from-navy via-navy to-orange/70 p-8 text-white md:min-h-full">
          <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_30%,white_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="relative flex h-full flex-col justify-between gap-6">
            <div className="flex items-start justify-between gap-3">
              <Badge className="border-0 bg-orange text-orange-foreground font-bold uppercase tracking-wide">
                Mais Procurado
              </Badge>
              <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-navy">
                {course.modality}
              </span>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <Icon className="size-28 text-white/95 drop-shadow-xl sm:size-32" strokeWidth={1.4} />
            </div>
            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange">
                <TrendingUp className="size-4" /> Potencial de renda
              </div>
              <div className="mt-1 font-display text-lg font-extrabold">{content.income}</div>
            </div>
          </div>
        </div>

        {/* Content side */}
        <div className="flex flex-col p-7 sm:p-8">
          <div className="text-xs font-bold uppercase tracking-widest text-orange">
            {content.tagline}
          </div>
          <h3 className="mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl">
            {course.name}
          </h3>
          <p className="mt-3 text-foreground/80">{course.description}</p>

          <ul className="mt-5 space-y-2.5">
            {content.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-foreground/85">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-orange" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" /> {course.duration}
            </span>
            <span>·</span>
            <span>{course.hours}</span>
            <span>·</span>
            <span>Certificação reconhecida</span>
          </div>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs text-muted-foreground line-through">
                De R$ {course.originalPrice}/mês
              </div>
              <div className="font-display text-3xl font-extrabold text-navy">
                R$ {course.price}
                <span className="text-sm font-semibold text-muted-foreground">/mês</span>
              </div>
              <div className="mt-1 inline-block rounded-full bg-orange/10 px-2.5 py-0.5 text-[11px] font-bold text-orange">
                50% OFF na matrícula
              </div>
            </div>
            <Button asChild variant="cta" size="lg">
              <Link to="/cursos/$slug" params={{ slug: course.slug }}>
                Garantir vaga <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
