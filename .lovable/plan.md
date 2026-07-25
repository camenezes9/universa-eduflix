## Melhorias de Performance Mobile (66 → 90+)

Desktop está ótimo (95). O gargalo é mobile, onde imagens grandes, LCP e JS bloqueante pesam mais em 4G/CPU lento.

### O que faremos

1. **Imagens responsivas (maior ganho no mobile)**
   - Gerar versões menores (480w / 768w / 1200w) das imagens principais (hero, logo, cards de curso em destaque).
   - Usar `srcset` + `sizes` para o browser baixar só o tamanho necessário — hoje mobile baixa imagem desktop.
   - Adicionar `loading="lazy"` nos cards de curso fora da viewport inicial (mantendo `fetchPriority="high"` só no hero).

2. **Reduzir peso do hero no mobile**
   - Gerar variante mobile do `hero.webp` (portrait/quadrada, ~600px) e servir via `<picture>` com media query.
   - Preload condicional apenas da versão correta.

3. **CLS e reservas de espaço**
   - Adicionar `width`/`height` explícitos em todas as `<img>` de cards e imagens de clínicas (evita reflow).
   - Usar `aspect-ratio` no CSS onde faltar.

4. **JS / render-blocking**
   - Auditar imports pesados no root (framer-motion, etc.) e converter para lazy onde possível.
   - Confirmar que o `CookieBanner` e o `WhatsAppFab` só montam após hydrate (sem bloquear LCP).

5. **Fontes**
   - Adicionar `&display=swap` (se ainda não estiver) e `preconnect` para `fonts.gstatic.com` — evita FOIT.

6. **Verificação**
   - Rodar Playwright headless simulando mobile + throttling para medir LCP/CLS aproximados antes de você rodar PageSpeed novamente.

### Fora do escopo

- Não vamos mudar layout, cores, textos ou funcionalidades.
- Não vamos trocar libs (shadcn/tailwind/tanstack) por alternativas.

Aprovando, eu implemento tudo em uma passada.
