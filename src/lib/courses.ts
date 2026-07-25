import {
  HandHeart,
  HeartPulse,
  Hand,
  Globe2,
  GraduationCap,
  PawPrint,
  Sparkles,
  Eye,
  Briefcase,
  Building2,
  Fuel,
  Stethoscope,
  Laptop,
  type LucideIcon,
} from "lucide-react";
import massoterapiaImg from "@/assets/course-massoterapia.webp";
import cuidadorImg from "@/assets/course-cuidador.webp";
import librasImg from "@/assets/course-libras.webp";
import inglesImg from "@/assets/course-ingles.webp";
import monitorImg from "@/assets/course-monitor.webp";
import veterinarioImg from "@/assets/course-veterinario.webp";
import manicureImg from "@/assets/course-manicure.webp";
import ciliosImg from "@/assets/course-cilios.webp";
import administracaoImg from "@/assets/course-administracao.webp";
import gestaoImg from "@/assets/course-gestao.webp";
import frentistaImg from "@/assets/course-frentista.webp";
import recepcaoImg from "@/assets/course-recepcao.webp";
import informaticaImg from "@/assets/course-informatica.webp";

export type Modality = "Presencial" | "EAD";

export type Course = {
  slug: string;
  name: string;
  icon: LucideIcon;
  image: string;
  modality: Modality;
  duration: string;
  hours: string;
  price: number;
  originalPrice: number;
  area: "Saúde" | "Beleza" | "Educação" | "Administração" | "Idiomas" | "Serviços";
  badge?: "MAIS PROCURADO" | "NOVO";
  short: string;
  description: string;
  learn: string[];
  audience: string;
  nextClass: string;
};

export const courses: Course[] = [
  {
    slug: "massoterapia",
    image: massoterapiaImg,
    name: "Massoterapia",
    icon: HandHeart,
    modality: "Presencial",
    duration: "12 meses",
    hours: "96h",
    price: 149,
    originalPrice: 298,
    area: "Saúde",
    badge: "MAIS PROCURADO",
    short: "Torne-se um profissional em técnicas de massagem terapêutica e relaxante.",
    description:
      "Formação completa em massoterapia com aulas práticas em ambiente profissional. Domine técnicas modernas e tradicionais.",
    learn: [
      "Anatomia e fisiologia aplicadas",
      "Massagem relaxante e terapêutica",
      "Drenagem linfática",
      "Pedras quentes e aromaterapia",
      "Ética e atendimento ao cliente",
    ],
    audience: "Pessoas que desejam atuar em clínicas, spas ou de forma autônoma.",
    nextClass: "10 de Fevereiro",
  },
  {
    slug: "cuidador-de-idosos",
    image: cuidadorImg,
    name: "Cuidador de Idosos",
    icon: HeartPulse,
    modality: "Presencial",
    duration: "12 meses",
    hours: "96h",
    price: 129,
    originalPrice: 258,
    area: "Saúde",
    badge: "MAIS PROCURADO",
    short: "Profissão em alta com garantia de mercado. Aprenda com quem entende.",
    description:
      "Curso reconhecido para atuar no cuidado integral da pessoa idosa em domicílio, hospitais e instituições.",
    learn: [
      "Primeiros socorros",
      "Higiene e conforto",
      "Administração de medicamentos",
      "Nutrição do idoso",
      "Aspectos psicológicos do envelhecimento",
    ],
    audience: "Quem busca uma carreira com propósito e alta empregabilidade.",
    nextClass: "05 de Fevereiro",
  },
  {
    slug: "libras",
    image: librasImg,
    name: "Libras",
    icon: Hand,
    modality: "Presencial",
    duration: "12 meses",
    hours: "96h",
    price: 119,
    originalPrice: 238,
    area: "Educação",
    short: "Comunique-se em Língua Brasileira de Sinais e amplie oportunidades.",
    description:
      "Do básico ao intermediário com professores fluentes e materiais atualizados.",
    learn: [
      "Alfabeto e números",
      "Vocabulário do cotidiano",
      "Estrutura gramatical",
      "Cultura surda",
      "Interpretação prática",
    ],
    audience: "Educadores, profissionais de saúde e qualquer pessoa interessada em inclusão.",
    nextClass: "15 de Fevereiro",
  },
  {
    slug: "ingles",
    image: inglesImg,
    name: "Inglês",
    icon: Globe2,
    modality: "Presencial",
    duration: "12 meses",
    hours: "96h",
    price: 139,
    originalPrice: 278,
    area: "Idiomas",
    short: "Do zero à conversação fluente com metodologia comunicativa.",
    description:
      "Método focado em conversação, com turmas reduzidas e prática desde a primeira aula.",
    learn: [
      "Conversação prática",
      "Gramática essencial",
      "Vocabulário para o trabalho",
      "Compreensão auditiva",
      "Preparação para viagens e entrevistas",
    ],
    audience: "Estudantes e profissionais que querem crescer na carreira.",
    nextClass: "01 de Fevereiro",
  },
  {
    slug: "monitor-escolar",
    image: monitorImg,
    name: "Monitor Escolar",
    icon: GraduationCap,
    modality: "Presencial",
    duration: "12 meses",
    hours: "96h",
    price: 119,
    originalPrice: 238,
    area: "Educação",
    badge: "NOVO",
    short: "Atue como apoio pedagógico em escolas de educação infantil e fundamental.",
    description:
      "Formação para acompanhar alunos em atividades pedagógicas, recreativas e de rotina escolar.",
    learn: [
      "Psicologia infantil",
      "Recreação e ludicidade",
      "Primeiros socorros escolares",
      "Rotinas pedagógicas",
      "Inclusão escolar",
    ],
    audience: "Interessados em atuar em escolas particulares e municipais.",
    nextClass: "12 de Fevereiro",
  },
  {
    slug: "auxiliar-veterinario",
    image: veterinarioImg,
    name: "Auxiliar Veterinário",
    icon: PawPrint,
    modality: "Presencial",
    duration: "12 meses",
    hours: "96h",
    price: 139,
    originalPrice: 278,
    area: "Saúde",
    short: "Aprenda a cuidar de pets em clínicas, pet shops e hospitais veterinários.",
    description:
      "Formação prática para auxiliar médicos veterinários em atendimentos, cirurgias e cuidados diários.",
    learn: [
      "Anatomia animal",
      "Contenção e manejo",
      "Auxílio em procedimentos clínicos",
      "Higienização e biossegurança",
      "Atendimento ao tutor",
    ],
    audience: "Amantes de animais que desejam trabalhar na área pet.",
    nextClass: "20 de Fevereiro",
  },
  {
    slug: "manicure",
    image: manicureImg,
    name: "Manicure",
    icon: Sparkles,
    modality: "Presencial",
    duration: "12 meses",
    hours: "96h",
    price: 99,
    originalPrice: 198,
    area: "Beleza",
    short: "Domine técnicas modernas de manicure e pedicure com aulas 100% práticas.",
    description:
      "Do básico ao avançado, incluindo francesinha, esmaltação em gel e nail art.",
    learn: [
      "Anatomia das unhas",
      "Esmaltação tradicional e em gel",
      "Nail art e decoração",
      "Spa dos pés",
      "Empreendedorismo na beleza",
    ],
    audience: "Quem quer renda extra ou uma nova carreira na beleza.",
    nextClass: "08 de Fevereiro",
  },
  {
    slug: "cilios-e-sobrancelhas",
    image: ciliosImg,
    name: "Cílios e Sobrancelhas",
    icon: Eye,
    modality: "Presencial",
    duration: "12 meses",
    hours: "96h",
    price: 129,
    originalPrice: 258,
    area: "Beleza",
    badge: "NOVO",
    short: "Design de sobrancelhas, extensão de cílios e técnicas de alta demanda.",
    description:
      "Curso completo com aulas práticas em modelos reais. Certificação garantida.",
    learn: [
      "Design de sobrancelhas",
      "Henna e micropigmentação",
      "Extensão de cílios fio a fio",
      "Volume russo",
      "Atendimento e precificação",
    ],
    audience: "Profissionais da beleza e iniciantes na área.",
    nextClass: "18 de Fevereiro",
  },
  {
    slug: "administracao",
    image: administracaoImg,
    name: "Administração",
    icon: Briefcase,
    modality: "EAD",
    duration: "12 meses",
    hours: "96h",
    price: 79,
    originalPrice: 158,
    area: "Administração",
    short: "Fundamentos de administração para o mercado atual.",
    description: "Curso 100% online com certificado reconhecido. Estude no seu ritmo.",
    learn: [
      "Fundamentos da administração",
      "Gestão financeira",
      "Marketing e vendas",
      "Gestão de pessoas",
      "Empreendedorismo",
    ],
    audience: "Profissionais em busca de qualificação para o mercado.",
    nextClass: "Turmas semanais",
  },
  {
    slug: "gestao-empresarial",
    image: gestaoImg,
    name: "Gestão Empresarial",
    icon: Building2,
    modality: "EAD",
    duration: "12 meses",
    hours: "96h",
    price: 89,
    originalPrice: 178,
    area: "Administração",
    short: "Ferramentas para liderar times e empresas com eficiência.",
    description: "Aprenda estratégia, liderança e gestão de processos.",
    learn: [
      "Planejamento estratégico",
      "Liderança",
      "Gestão de processos",
      "Indicadores de desempenho",
      "Tomada de decisão",
    ],
    audience: "Gestores, empreendedores e líderes de equipe.",
    nextClass: "Turmas semanais",
  },
  {
    slug: "frentista",
    image: frentistaImg,
    name: "Frentista",
    icon: Fuel,
    modality: "EAD",
    duration: "12 meses",
    hours: "96h",
    price: 59,
    originalPrice: 118,
    area: "Serviços",
    short: "Formação rápida para atuar em postos de combustíveis.",
    description: "Certificação obrigatória para atuação, com módulos práticos.",
    learn: [
      "Atendimento ao cliente",
      "Segurança no trabalho",
      "Normas ambientais",
      "Operação de bombas",
      "Prevenção de acidentes",
    ],
    audience: "Interessados em empregabilidade rápida.",
    nextClass: "Turmas semanais",
  },
  {
    slug: "recepcao-hospitalar",
    image: recepcaoImg,
    name: "Recepção Hospitalar",
    icon: Stethoscope,
    modality: "EAD",
    duration: "12 meses",
    hours: "96h",
    price: 79,
    originalPrice: 158,
    area: "Saúde",
    short: "Especialização em atendimento e rotinas de hospitais e clínicas.",
    description: "Formação para atuar em recepções da área da saúde.",
    learn: [
      "Rotinas hospitalares",
      "Prontuário e sistemas",
      "Atendimento humanizado",
      "Convênios e faturamento",
      "Ética profissional",
    ],
    audience: "Quem busca vagas em hospitais, clínicas e laboratórios.",
    nextClass: "Turmas semanais",
  },
  {
    slug: "informatica",
    image: informaticaImg,
    name: "Informática Essencial",
    icon: Laptop,
    modality: "EAD",
    duration: "12 meses",
    hours: "96h",
    price: 69,
    originalPrice: 138,
    area: "Administração",
    short: "Domine o computador, pacote Office e ferramentas do dia a dia profissional.",
    description:
      "Formação prática em informática do básico ao intermediário, com foco em empregabilidade e produtividade.",
    learn: [
      "Windows e organização de arquivos",
      "Word, Excel e PowerPoint",
      "Internet, e-mail e navegadores",
      "Google Drive e ferramentas online",
      "Segurança digital",
    ],
    audience: "Quem quer entrar no mercado ou ganhar autonomia no uso do computador.",
    nextClass: "Turmas semanais",
  },
];

export type UpsellSuggestion = {
  slug: string;
  reason: string;
};

export const upsells: Record<string, UpsellSuggestion[]> = {
  massoterapia: [
    {
      slug: "administracao",
      reason:
        "Como massoterapeuta você vira dono do próprio negócio. Saber administrar preços, agenda e fluxo de caixa é o que separa quem sobrevive de quem prospera.",
    },
    {
      slug: "informatica",
      reason:
        "Agenda online, controle de clientes, emissão de nota e divulgação nas redes exigem domínio do computador. É o mínimo para uma clínica moderna.",
    },
  ],
  "cuidador-de-idosos": [
    {
      slug: "massoterapia",
      reason:
        "Aplicar massagens terapêuticas no idoso alivia dores, melhora a circulação e faz de você o profissional de confiança de toda a família — não só do paciente.",
    },
    {
      slug: "informatica",
      reason:
        "Casas de repouso e clínicas usam sistemas para prontuários e escalas. Quem domina informática costuma ser promovido a cargos de liderança.",
    },
  ],
  "monitor-escolar": [
    {
      slug: "libras",
      reason:
        "Escolas priorizam monitores que promovem inclusão. Saber Libras te qualifica para acompanhar alunos surdos e amplia muito suas chances de contratação.",
    },
    {
      slug: "informatica",
      reason:
        "Vagas no administrativo escolar (secretaria, coordenação) exigem informática. É a ponte para sair do apoio pedagógico e crescer na escola.",
    },
  ],
  manicure: [
    {
      slug: "administracao",
      reason:
        "Precificar serviços, controlar produtos e fidelizar clientes é o que transforma uma manicure em dona de estúdio. Aprenda a estruturar seu negócio desde o início.",
    },
    {
      slug: "cilios-e-sobrancelhas",
      reason:
        "Oferecer cílios e design de sobrancelhas no mesmo atendimento aumenta o ticket médio e retém a cliente por muito mais tempo.",
    },
  ],
  "cilios-e-sobrancelhas": [
    {
      slug: "administracao",
      reason:
        "Quem trabalha com beleza precisa saber administrar agenda, estoque e marketing. Sem gestão, o talento não vira renda estável.",
    },
    {
      slug: "manicure",
      reason:
        "Somar manicure ao seu portfólio faz a cliente resolver tudo em um único lugar — e você fatura mais por atendimento.",
    },
  ],
  "auxiliar-veterinario": [
    {
      slug: "administracao",
      reason:
        "Pet shops e clínicas valorizam quem entende de gestão de estoque, atendimento e vendas. Abre porta para cargos de coordenação.",
    },
  ],
};

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
