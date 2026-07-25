import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "ue_cookie_consent_v1";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, date: new Date().toISOString() }),
      );
    } catch {
      // ignore storage errors
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies e LGPD"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 p-4 shadow-elevated backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:p-5"
    >
      <button
        type="button"
        onClick={() => decide("rejected")}
        aria-label="Fechar aviso"
        className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <X className="size-4" />
      </button>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="hidden size-10 shrink-0 items-center justify-center rounded-full bg-orange/15 text-orange sm:flex">
          <Cookie className="size-5" />
        </div>

        <div className="flex-1 pr-6">
          <h2 className="font-display text-base font-bold text-navy">
            Sua privacidade é importante
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Utilizamos cookies para melhorar sua experiência, analisar o uso do
            site e personalizar conteúdo. Ao continuar navegando, você concorda
            com nossa Política de Privacidade, em conformidade com a{" "}
            <strong className="text-foreground">
              Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)
            </strong>
            .
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              variant="cta"
              onClick={() => decide("accepted")}
              className="min-w-32"
            >
              Aceitar todos
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => decide("rejected")}
            >
              Somente essenciais
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
