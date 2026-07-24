import { GraduationCap } from "lucide-react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-orange to-orange/70 text-orange-foreground shadow-soft">
        <GraduationCap className="size-6" strokeWidth={2.4} />
      </div>
      <div className="leading-tight">
        <div
          className={`font-display text-lg font-extrabold tracking-tight ${
            light ? "text-white" : "text-navy"
          }`}
        >
          Universo <span className="text-orange">Educa+</span>
        </div>
        <div
          className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
            light ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          Cursos Profissionalizantes
        </div>
      </div>
    </div>
  );
}
