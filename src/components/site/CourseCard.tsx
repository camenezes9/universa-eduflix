import { Link } from "@tanstack/react-router";
import { Clock, ArrowRight } from "lucide-react";
import type { Course } from "@/lib/courses";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CourseCard({ course }: { course: Course }) {
  return (
    <div className="card-hover group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="relative h-44 overflow-hidden">
        <img
          src={course.image}
          alt={course.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
        {course.badge && (
          <Badge
            variant="secondary"
            className={`absolute left-3 top-3 border-0 font-bold uppercase tracking-wide ${
              course.badge === "NOVO"
                ? "bg-success text-white"
                : "bg-orange text-orange-foreground"
            }`}
          >
            {course.badge}
          </Badge>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-navy">
          {course.modality}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-navy">{course.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{course.short}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Clock className="size-3.5" /> {course.duration}</span>
          <span>·</span>
          <span>{course.hours}</span>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="text-[11px] text-muted-foreground line-through">
              De R$ {course.originalPrice}
            </div>
            <div className="font-display text-xl font-extrabold text-navy">
              R$ {course.price}
              <span className="text-xs font-semibold text-muted-foreground">/mês</span>
            </div>
          </div>
          <Button asChild variant="cta" size="sm">
            <Link to="/cursos/$slug" params={{ slug: course.slug }}>
              Ver <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
