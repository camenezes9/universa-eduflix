import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Gift,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface FreeCourseModalProps {
  trigger?: React.ReactNode;
  defaultCourse?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const freeCoursesList = [
  { id: "intro-masso", name: "Introdução à Massoterapia e Bem-Estar (Introdutório)", area: "Saúde" },
  { id: "intro-cuidador", name: "Fundamentos de Cuidador de Idosos (Introdutório)", area: "Saúde" },
  { id: "intro-adm", name: "Primeiros Passos em Rotinas Administrativas (Introdutório)", area: "Administração" },
  { id: "intro-info", name: "Inclusão Digital e Informática Essencial (Introdutório)", area: "Tecnologia" },
  { id: "intro-ingles", name: "Inglês para Iniciantes no Mercado de Trabalho (Introdutório)", area: "Idiomas" },
  { id: "intro-atendimento", name: "Técnicas de Atendimento ao Cliente e Recepção (Introdutório)", area: "Serviços" },
];

export function FreeCourseModal({
  trigger,
  defaultCourse,
  isOpen,
  onOpenChange,
}: FreeCourseModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [unit, setUnit] = useState("rio-claro");
  const [selectedCourse, setSelectedCourse] = useState(defaultCourse || freeCoursesList[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = onOpenChange !== undefined ? onOpenChange : setInternalOpen;

  const handleCpfMask = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  };

  const handlePhoneMask = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{4})$/, "$1-$2")
      .slice(0, 15);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !cpf.trim()) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    if (cpf.length < 14) {
      toast.error("Por favor, digite um CPF válido.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      toast.success("Solicitação recebida! Entraremos em contato para confirmar sua vaga.");
    }, 1000);
  };

  const resetForm = () => {
    setIsSuccess(false);
    setName("");
    setPhone("");
    setCpf("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-lg">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-orange/10 text-orange mb-2">
                <Gift className="size-6" />
              </div>
              <DialogTitle className="text-center font-display text-2xl font-extrabold text-navy">
                Verificar Vaga em Curso Gratuito
              </DialogTitle>
              <DialogDescription className="text-center text-sm text-muted-foreground">
                Dê o primeiro passo para explorar sua vocação com aulas introdutórias 100% gratuitas.
              </DialogDescription>
            </DialogHeader>

            {/* Banner de Regra de Ouro */}
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-950 dark:text-amber-200">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="size-4 shrink-0 text-amber-600 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Regra de Ouro:</strong> Para que mais pessoas tenham acesso a essa oportunidade, o limite é de <strong>apenas 1 (um) curso gratuito por CPF</strong>.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <Label htmlFor="free-course-select" className="text-xs font-semibold text-navy">
                  Curso Gratuito de Interesse *
                </Label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger id="free-course-select" className="mt-1">
                    <SelectValue placeholder="Selecione o curso" />
                  </SelectTrigger>
                  <SelectContent>
                    {freeCoursesList.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="unit-select" className="text-xs font-semibold text-navy">
                  Unidade Mais Próxima *
                </Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger id="unit-select" className="mt-1">
                    <SelectValue placeholder="Selecione a unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rio-claro">📍 Rio Claro (Sede Própria - Centro)</SelectItem>
                    <SelectItem value="santa-barbara">📍 Santa Bárbara d'Oeste (Polo Anhanguera)</SelectItem>
                    <SelectItem value="sumare">📍 Sumaré (Polo Anhanguera)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="lead-name" className="text-xs font-semibold text-navy">
                    Nome Completo *
                  </Label>
                  <Input
                    id="lead-name"
                    required
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lead-phone" className="text-xs font-semibold text-navy">
                    WhatsApp *
                  </Label>
                  <Input
                    id="lead-phone"
                    required
                    placeholder="(19) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(handlePhoneMask(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="lead-cpf" className="text-xs font-semibold text-navy">
                  CPF * (necessário para validação da vaga)
                </Label>
                <Input
                  id="lead-cpf"
                  required
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(handleCpfMask(e.target.value))}
                  className="mt-1"
                />
                <p className="mt-1.5 text-[11px] leading-tight text-muted-foreground">
                  * Ao se inscrever, você concorda que a oferta de cursos gratuitos é limitada a 1 por CPF. Nossos consultores entrarão em contato para confirmar sua vaga.
                </p>
              </div>

              <Button
                type="submit"
                variant="cta"
                size="lg"
                className="w-full font-bold shadow-soft"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" /> Validando disponibilidade...
                  </>
                ) : (
                  <>
                    Verificar Vaga e Garantir Acesso <ArrowRight className="size-4 ml-1" />
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5 text-success" /> Seus dados estão seguros e protegidos.
              </div>
            </form>
          </>
        ) : (
          <div className="py-6 text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-success/15 text-success mb-4">
              <CheckCircle2 className="size-8" />
            </div>
            <h3 className="font-display text-2xl font-extrabold text-navy">
              Solicitação Enviada com Sucesso!
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
              Recebemos seus dados para o curso gratuito. Nosso consultor educacional verificará o limite por CPF e entrará em contato via WhatsApp para confirmar a liberação da sua turma.
            </p>
            <div className="mt-6 rounded-xl bg-secondary/80 p-4 text-xs text-left space-y-1.5 border border-border">
              <div className="flex items-center gap-1.5 font-bold text-navy">
                <Sparkles className="size-3.5 text-orange" /> Lembrete importante:
              </div>
              <p className="text-muted-foreground">
                Este curso introdutório dá uma visão inicial da profissão. Ao concluir, você poderá optar por avançar para a formação profissionalizante completa com certificação nacional!
              </p>
            </div>
            <Button variant="cta" className="mt-6 w-full" onClick={resetForm}>
              Concluir
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
