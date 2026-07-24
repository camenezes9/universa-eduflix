import { Link } from "@tanstack/react-router";
import { Menu, Phone } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/cursos", label: "Cursos" },
  { to: "/agendar", label: "Agendar visita" },
  { to: "/#depoimentos", label: "Depoimentos" },
  { to: "/#contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-secondary hover:text-navy"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:+5500000000000"
            className="flex items-center gap-2 text-sm font-semibold text-navy"
          >
            <Phone className="size-4" /> (00) 0000-0000
          </a>
          <Button asChild variant="cta" size="sm">
            <Link to="/cursos">Matricule-se</Link>
          </Button>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Abrir menu"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-1 px-4">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-semibold text-foreground hover:bg-secondary"
                >
                  {n.label}
                </Link>
              ))}
              <Button asChild variant="cta" className="mt-4">
                <Link to="/cursos" onClick={() => setOpen(false)}>
                  Matricule-se
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
