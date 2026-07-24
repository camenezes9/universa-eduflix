import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, TrendingUp, Clock } from "lucide-react";
import type { Course } from "@/lib/courses";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type FeaturedContent = {
  tagline: string;
  highlights: string[];
  income: string;
  image: string;
};

export function FeaturedCourseCard({
  course,
  content,
}: {
  course: Course;
  content: FeaturedContent;
}) {
  return (
    <div className="card-hover group relative flex aspect-square flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-elevated">
      {/* Image */}
      <div className="relative h-1/2 w-full overflow-hidden">
        <img
          src={content.image}
          alt={course.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
          <Badge className="border-0 bg-orange text-orange-foreground font-bold uppercase tracking-wide">
            Mais Procurado
          </Badge>
          <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-navy">
            {course.modality}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-orange">
              {content.tagline}
            </div>
            <h3 className="mt-1 font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              {course.name}
            </h3>
          </div>
          <div className="hidden rounded-xl bg-white/15 px-3 py-2 backdrop-blur sm:block">
            <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-orange">
              <TrendingUp className="size-3" /> Renda
            </div>
            <div className="font-display text-xs font-extrabold text-white">
              {content.income}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <ul className="space-y-2">
          {content.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-foreground/85">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-orange" />
              <span className="line-clamp-2">{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-border pt-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <Clock className="size-3" /> {course.duration} · {course.hours}
            </div>
            <div className="text-[11px] text-muted-foreground line-through">
              De R$ {course.originalPrice}/mês
            </div>
            <div className="font-display text-2xl font-extrabold text-navy">
              R$ {course.price}
              <span className="text-xs font-semibold text-muted-foreground">/mês</span>
            </div>
          </div>
          <Button asChild variant="cta" size="default">
            <Link to="/cursos/$slug" params={{ slug: course.slug }}>
              Garantir vaga <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
