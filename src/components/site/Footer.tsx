import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, MessageCircle, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Logo } from "./Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer id="contato" className="mt-24 bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo light />
          <p className="mt-4 text-sm text-white/70">
            Referência em ensino profissionalizante. Transformando vidas por meio da educação de qualidade.
          </p>
          <div className="mt-5 flex gap-2">
            {[Instagram, Facebook, Youtube, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Rede social"
                className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-orange"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-base font-bold text-white">Contato</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex gap-3"><MapPin className="size-4 shrink-0 text-orange" /> Av. Principal, 1000 — Centro</li>
            <li className="flex gap-3"><Phone className="size-4 shrink-0 text-orange" /> (00) 0000-0000</li>
            <li className="flex gap-3"><Mail className="size-4 shrink-0 text-orange" /> contato@universoeducamais.com.br</li>
            <li className="flex gap-3"><Clock className="size-4 shrink-0 text-orange" /> Seg à Sáb — 08h às 20h</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-bold text-white">Links rápidos</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li><Link to="/cursos" className="hover:text-orange">Todos os cursos</Link></li>
            <li><Link to="/" hash="depoimentos" className="hover:text-orange">Depoimentos</Link></li>
            <li><Link to="/" hash="matricula" className="hover:text-orange">Como se matricular</Link></li>
            <li><Link to="/" hash="faq" className="hover:text-orange">Perguntas frequentes</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-bold text-white">Newsletter</h4>
          <p className="mt-4 text-sm text-white/70">
            Receba novidades, promoções e datas de novas turmas.
          </p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="email"
              required
              placeholder="Seu melhor e-mail"
              className="bg-white/10 text-white placeholder:text-white/50"
            />
            <Button variant="cta" type="submit">OK</Button>
          </form>
          <div className="mt-6 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-widest text-white/60">
            <span className="rounded border border-white/20 px-2 py-1">Pix</span>
            <span className="rounded border border-white/20 px-2 py-1">Visa</span>
            <span className="rounded border border-white/20 px-2 py-1">Master</span>
            <span className="rounded border border-white/20 px-2 py-1">Boleto</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-white/60 sm:px-6 lg:px-8">
          © 2026 Universo Educa+ — Todos os direitos reservados.
          {/* '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''
                                        
                                            
                                            I have approved the plan */}
        </div>
      </div>
    </footer>
  );
}
