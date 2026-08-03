# HANDOFF — Máquina de Vendas

> Documento gerado para retomar o desenvolvimento em uma nova conversa sem perda de contexto.
> Data: 2026-08-03 (última sessão de trabalho).
> Local do projeto: `C:\Users\joaov\Downloads\Maquina_de_Vendas-main\Maquina_de_Vendas-main`
> Repositório GitHub: `Joa0Zera/maquina-de-vendas` (privado)
> Produção: `https://web-three-liard-77.vercel.app`

---

# Resumo do Projeto

## Objetivo

"Máquina de Vendas" é um SaaS de automação de infoprodutos: o usuário escolhe um nicho/tendência, e o sistema deve gerar automaticamente — com o mínimo de intervenção manual — um ebook, uma oferta, uma landing page pública, copy de marketing, checkout de pagamento (via Cakto) e um dashboard de acompanhamento de vendas. A visão de longo prazo é conectar descoberta de tendências (redes sociais) → criação de produto → venda, de forma quase totalmente automática, rodando em paralelo a outro projeto do usuário ("Nevion").

Fluxo original (do briefing inicial do usuário):
1. Nicho + Subnicho
2. Geração de Ebook (capa + sumário + 8 páginas + CTA, IA gera conteúdo e imagens, PDF de 10 páginas)
3. Cadastro Cakto automático (usuário só define preço)
4. Landing Page automática (IA → V0.dev → Vercel → URL pública)
5. Copy para marketing (WhatsApp, Facebook, Instagram)
6. Dashboard de vendas (webhook Cakto)

## Estado atual (o que funciona de ponta a ponta, testado em produção)

- Login/cadastro (Better Auth) funcionando.
- Criar Projeto (`/products/new`) → pipeline automático completo: Produto → Oferta → Pesquisa de Tráfego → Copy → Distribuição Orgânica → Relatório de Inteligência. Testado e confirmado funcionando.
- Publicar produto → landing pública ativa em `/p/{slug}` (template fixo, não V0.dev).
- Sincronizar com Cakto (botão na aba Checkout do produto) → cria produto + reaproveita oferta padrão da Cakto → propaga URL de checkout pra landing pública. Testado com API real, funcionando.
- Geração de ebook com conteúdo real via IA (Gemini) em vez de templates fixos. Testado, produz capítulos substanciais e coerentes.
- Geração de PDF real do ebook (capa em texto, sumário, capítulos, CTA) via `pdf-lib`, com botão de download. Testado, PDF válido confirmado (`%PDF-1.7`).
- Conexão "tendência salva" → "criar produto automaticamente" (`generateProductFromTrend`) funcionando, mas alimentada só por cadastro manual de tendência (`/trends/new`), não por importação do Reddit (ver Pendências).
- Deploy automático: todo push na branch `main` do GitHub dispara build + migration + deploy na Vercel.
- Migrations de banco de dados sincronizadas com o schema (auditoria completa feita, ver seção Decisões Técnicas).

## O que ainda falta implementar

Ver seção **Pendências** (com prioridade) mais abaixo — resumo rápido:
- Capa/imagem do ebook (bloqueado por cota de billing do Gemini).
- Importação automática de tendências (Reddit abandonado por bug de captcha do lado do Reddit).
- Copy de marketing pronta para redes sociais (WhatsApp/Facebook/Instagram) — não implementado ainda.
- Dashboard principal (`/`) ainda mostra dados de exemplo fixos (mock), não dados reais.
- Muitas abas do workspace do produto são só placeholder "Em breve" (Pesquisa, Avatar, Criativos, Analytics, Receita, Timeline, Checklist, Arquivos).
- Página `/ebooks` não verifica se já existe ebook gerado nem linka pra ele (sempre mostra "Gerar Ebook").

---

# Arquitetura

## Estrutura de pastas (monorepo pnpm + Turborepo)

```
Maquina_de_Vendas-main/
├── apps/
│   ├── web/                          # App principal — Next.js 15 (App Router)
│   │   ├── src/
│   │   │   ├── app/                  # Rotas (App Router)
│   │   │   │   ├── (dashboard)/      # Grupo de rotas autenticadas
│   │   │   │   │   ├── products/[id]/[[...tab]]/page.tsx   # Workspace do produto (catch-all de abas)
│   │   │   │   │   ├── products/new/page.tsx                # Criar Projeto
│   │   │   │   │   ├── ebooks/                               # Listagem + detalhe de ebooks
│   │   │   │   │   ├── trends/                                # Tendências
│   │   │   │   │   ├── offers/[id]/checkout/                  # Registro manual de checkout Cakto
│   │   │   │   │   ├── settings/integrations/cakto/           # Config de credenciais Cakto por org
│   │   │   │   │   └── ... (outras páginas do dashboard)
│   │   │   │   ├── api/                                       # Route Handlers
│   │   │   │   │   ├── ebooks/[id]/pdf/route.ts                # Gera e serve PDF do ebook
│   │   │   │   │   ├── webhooks/cakto/route.ts                 # Recebe eventos de venda da Cakto
│   │   │   │   │   ├── integrations/                            # Endpoints de teste de integração
│   │   │   │   │   └── auth/[...all]/                            # Better Auth
│   │   │   │   └── p/[slug]/page.tsx                          # Landing pública do produto
│   │   │   ├── actions/              # Server Actions ("use server")
│   │   │   ├── components/           # Componentes React (client + server)
│   │   │   ├── lib/                  # Lógica de negócio, integrações, geradores de conteúdo
│   │   │   └── modules/factory/lib/factory-runner.ts   # Orquestrador do pipeline de criação
│   │   └── vercel.json               # Config de build da Vercel (root directory = apps/web)
│   └── api/                          # Backend Hono — LEGADO, praticamente não usado (ver Problemas Conhecidos)
├── packages/
│   ├── database/                     # Schema Drizzle + migrations
│   │   ├── src/schema/                # Um arquivo por tabela
│   │   └── drizzle/                   # Migrations SQL (0000 a 0004 atualmente)
│   ├── shared/                       # Tipos e constantes compartilhadas
│   └── tsconfig/                     # Configs TS compartilhadas
├── HANDOFF.md                        # Este arquivo
├── ARCHITECTURE.md                   # Doc original de arquitetura (desatualizado em partes)
├── README.md
├── docker-compose.yml                # Postgres + Redis locais (Redis não é usado no código real)
└── .env.example / .env               # Variáveis de ambiente
```

## Tecnologias

- **Frontend/Backend**: Next.js 15 (App Router), React 19, TypeScript
- **Estilo**: Tailwind CSS v4
- **Banco de dados**: PostgreSQL — Neon (produção, serverless) + Docker local (dev)
- **ORM**: Drizzle ORM + drizzle-kit (migrations)
- **Auth**: Better Auth (com adapter Drizzle)
- **IA**: Google Gemini (`@google/generative-ai`) — ativo. Anthropic Claude (`@anthropic-ai/sdk`) — implementado mas não ativo (fácil de trocar, ver Decisões Técnicas)
- **PDF**: `pdf-lib` (geração de PDF do ebook, pura JS, sem binário nativo — compatível com Vercel serverless)
- **Pagamento**: Cakto (gateway de pagamento brasileiro) via API REST + OAuth2 client_credentials
- **Deploy**: Vercel (projeto `web`, escopo `joaos-projects-921b7cdc`)
- **Monorepo**: pnpm workspaces + Turborepo
- **Backend secundário**: Hono (em `apps/api`) — legado, ver Problemas Conhecidos

## Padrões de arquitetura adotados

1. **Server Actions com padrão Core/Action**: para toda action que (a) precisa fazer `redirect()` quando chamada de um formulário, e (b) também precisa ser chamada programaticamente de dentro de outro fluxo (como o `FactoryRunner`), o padrão adotado foi separar em duas funções:
   - `xxxAction(id)` — versão pública, chama `requireOrganization()`, delega pro Core, e faz `redirect()` no final. Usada em `<form action={xxxAction.bind(null, id)}>`.
   - `xxxCore(id, organizationId)` — versão interna, só a lógica de negócio, sem redirect, sem chamar `requireOrganization()` (recebe organizationId já resolvido). Usada pelo `FactoryRunner`.

   Exemplos: `actions/copy.ts` (`generateCopyAssetsAction` / `generateCopyAssetsCore`), `actions/organic-distribution.ts`, `actions/intelligence.ts`.

   **Por quê**: `redirect()` do Next.js lança uma exceção especial internamente para sinalizar navegação. Quando uma action com `redirect()` é chamada programaticamente em sequência dentro de outra função (não como submit de formulário), essa exceção quebra o fluxo do chamador. Isso causou um bug real (pipeline de criação de produto quebrando) corrigido nesta sessão.

2. **Regra do Next.js para arquivos "use server"**: TODA função exportada de um arquivo com `"use server"` no topo é tratada como Server Action pelo compilador, e **deve ser `async`**. Funções síncronas exportadas desses arquivos quebram o build de produção com erro `Server Actions must be async functions` — esse erro **não aparece no `tsc --noEmit`**, só no build real do Next.js. Foi descoberto e corrigido nesta sessão (`generateTrafficResearchData` foi movida para um arquivo comum fora do escopo "use server").

3. **Abstração de provider de IA**: `lib/ai/provider.ts` mantém um `Map` de providers (`gemini`, `claude`) implementando a interface `AIProvider` (`generate`, `test`). `lib/ai/service.ts` (`aiService`) é a API de alto nível usada pelos geradores de conteúdo (ebook, copy, etc.) — nunca chama o provider diretamente. Trocar de Gemini para Claude é uma mudança de uma linha (`defaultProvider` em `provider.ts`).

4. **Multi-tenancy**: toda tabela relevante tem `organizationId`, toda query filtra por ele, `requireOrganization()` (`lib/session.ts`) resolve a organização do usuário autenticado no início de cada Server Action/página.

5. **FactoryRunner como orquestrador único**: `apps/web/src/modules/factory/lib/factory-runner.ts` é o único lugar que orquestra a criação completa de um produto (7 passos: Trend → Produto → Oferta → Tráfego → Copy → Distribuição → Inteligência), inserindo `launchEvents` para cada etapa. Chamado via `actions/product-factory.ts` → `createProjectFactory()`.

---

# Componentes e Funcionalidades

### 1. Criação de Produto (Pipeline Automático)
- **O que faz**: a partir de um tema digitado manualmente OU de uma tendência salva, cria produto, oferta, pesquisa de tráfego, copy, distribuição orgânica e relatório de inteligência, tudo em uma única chamada.
- **Onde**: `apps/web/src/modules/factory/lib/factory-runner.ts` (orquestrador), `apps/web/src/actions/product-factory.ts` (entry point), `apps/web/src/app/(dashboard)/products/new/page.tsx` (UI).
- **Como funciona**: `FactoryRunner.run(input)` recebe `{ organizationId, trendId?, theme?, category?, priceCents? }`. Se `trendId` presente, busca a trend no banco e usa `generateProductFromTrend(trend)` (`lib/product-generator.ts`) para gerar nome/headline/público-alvo/estrutura de ebook via detecção de domínio por palavra-chave. Senão, usa `theme` com um objeto mockado simples. Depois insere `products`, `offers`, gera `trafficResearch` (`lib/traffic-research-data.ts`), chama `generateCopyAssetsCore`, `generateOrganicDistributionCore`, `generateIntelligenceReportCore` em sequência, registrando `launchEvents` a cada passo.
- **Dependências**: tabelas `products`, `offers`, `trafficResearch`, `copyAssets`, `organicDistribution`, `intelligenceReports`, `launchEvents`, `trends`.

### 2. Workspace do Produto
- **O que faz**: página de detalhe do produto com sidebar de navegação por abas (Missão, Pesquisa, Avatar, Produto, Oferta, Landing, Checkout, Copy, Criativos, Distribuição, Analytics, Receita, Timeline, Checklist, Arquivos, IA, Configurações).
- **Onde**: `apps/web/src/app/(dashboard)/products/[id]/[[...tab]]/page.tsx` (rota catch-all opcional), `apps/web/src/components/workspace/workspace-sidebar.tsx` (sidebar client component).
- **Como funciona**: rota `[[...tab]]` (catch-all opcional) captura `/products/{id}` e `/products/{id}/qualquer-coisa` na mesma página, evitando 404. `activeTab` determina qual bloco de conteúdo renderizar. Só as abas `resumo`, `produto`, `oferta`, `landing`, `checkout`, `copy`, `organic`, `ia`, `configuracoes` têm conteúdo implementado; o resto cai num fallback "Em breve".
- **Atenção**: existem também sub-rotas explícitas dedicadas (`products/[id]/copy/`, `products/[id]/organic/`, `products/[id]/intelligence/`, `products/[id]/traffic/`, `products/[id]/campaign/`, `products/[id]/edit/`) que têm prioridade sobre o catch-all quando o segmento bate exatamente.

### 3. Integração Cakto (Pagamento)
- **O que faz**: cria produto + checkout na Cakto automaticamente, e recebe webhooks de venda.
- **Onde**:
  - `apps/web/src/lib/cakto.ts` — client "de verdade", usado pelo fluxo real. Credenciais por organização, buscadas da tabela `integration_settings` (não de env vars).
  - `apps/web/src/actions/checkout.ts` — `syncProductWithCaktoAction` (botão "Sincronizar com Cakto"), `publishToCaktoAction` (fluxo antigo, ainda existe), `registerCheckoutAction` (registro manual).
  - `apps/web/src/lib/providers/cakto/*` — client **legado/de teste**, usa env vars (`CAKTO_CLIENT_ID`/`CAKTO_CLIENT_SECRET`), só usado pelos endpoints `/api/integrations/cakto/*` de teste. Não é o fluxo de produção real.
  - `apps/web/src/app/settings/integrations/cakto/page.tsx` — UI onde o usuário cadastra client_id/secret POR ORGANIZAÇÃO (salvo em `integration_settings`).
  - `apps/web/src/app/api/webhooks/cakto/route.ts` — recebe eventos de venda.
- **Como funciona**: `getCaktoAccessToken(organizationId)` busca credenciais em `integration_settings`, faz `POST https://api.cakto.com.br/public_api/token/` (form-urlencoded, `client_id`+`client_secret`) → `access_token`. `createCaktoProduct()` faz `POST /public_api/products/`. **Importante**: criar um produto na Cakto **já cria automaticamente uma oferta padrão com checkout** — não é preciso (nem deve) criar uma segunda oferta manualmente; `getCaktoProductOffers()` busca essa oferta padrão via `GET /public_api/offers/?product={id}`. URL de checkout segue o padrão fixo `https://pay.cakto.com.br/{id_da_oferta}` (a API não retorna esse campo na resposta de criação de oferta).
- **Dependências**: tabela `integration_settings` (credenciais por org), `products.caktoProductId`/`products.checkoutUrl`, `offers.caktoOfferId`/`offers.caktoCheckoutUrl`.
- **Preço**: fonte de verdade é `products.priceCents` (definido pelo usuário ao criar o projeto), não `offers.pricing` (que o pipeline automático nunca preenche).

### 4. Geração de Ebook (Conteúdo + PDF)
- **O que faz**: gera o conteúdo textual completo de um ebook via IA (título, subtítulo, introdução, 6-8 capítulos com conteúdo real, conclusão) e produz um PDF real para download.
- **Onde**:
  - `apps/web/src/lib/ebook-ai-generator.ts` — `generateEbookContentWithAI(offer)`, usa `aiService.generateText()` com prompt estruturado pedindo JSON. Tem fallback para `lib/ebook-generator.ts` (templates fixos, código antigo mantido só como fallback) se a IA falhar ou retornar formato inesperado.
  - `apps/web/src/actions/ebooks.ts` — `generateEbookFromOfferAction`, salva em `ebooks.structure` (jsonb).
  - `apps/web/src/lib/ebook-pdf.ts` — `generateEbookPdf()`, usa `pdf-lib` pra montar capa (só texto), sumário, uma página por capítulo (com quebra automática), conclusão, e página de CTA com o link de checkout.
  - `apps/web/src/app/api/ebooks/[id]/pdf/route.ts` — Route Handler que gera o PDF sob demanda e serve como download (`Content-Disposition: attachment`).
- **Como funciona**: prompt pede explicitamente JSON no formato `{ title, subtitle, introduction, chapters: [{chapterTitle, chapterSummary, content}], conclusion }`; parsing tenta extrair JSON de dentro de blocos markdown ou heurística de `{`...`}`. Cada capítulo tem 2-4 parágrafos de conteúdo real (não resumo genérico).
- **Limitação conhecida**: capa é só texto/design, sem imagem — geração de imagem no Gemini está com cota zero nesse projeto (ver Problemas Conhecidos).
- **Dependências**: `aiService` (Gemini), tabela `ebooks`, `pdf-lib`.

### 5. Tendências (Trends)
- **O que faz**: permite cadastrar manualmente um "assunto bombando" e criar um produto a partir dele.
- **Onde**: `apps/web/src/app/(dashboard)/trends/` (listagem, novo, editar), `apps/web/src/lib/reddit.ts` (client OAuth do Reddit, **funcional mas sem credencial configurada**), `apps/web/src/actions/trend-import.ts` (`importTrendsAction`, importação automática via Reddit — não testável ainda), `apps/web/src/lib/trend-scoring.ts` (pontuação de oportunidade 0-100), `apps/web/src/lib/product-generator.ts` (`generateProductFromTrend`).
- **Como funciona**: botão "Criar Produto" em cada card de tendência (`components/trends/trend-card.tsx`) linka pra `/products/new?trendId={id}`, que pré-preenche o tema e, ao submeter, `FactoryRunner` usa `generateProductFromTrend(trend)` em vez do fallback manual.
- **Pendência**: importação automática via Reddit está implementada no código mas **nunca foi testada** porque não foi possível criar o app OAuth no Reddit (ver Problemas Conhecidos). Hoje o único jeito de popular `trends` é manual via `/trends/new`.

### 6. Landing Page Pública
- **O que faz**: página de vendas pública em `/p/{slug}`.
- **Onde**: `apps/web/src/app/p/[slug]/page.tsx`, `apps/web/src/components/landing/public-landing.tsx`, `apps/web/src/lib/products.ts` (`getPublishedProductBySlug`).
- **Como funciona**: template fixo (não gerado por V0.dev nem por IA por completo) — hero, seção "o que você vai conquistar", depoimentos (**hardcoded/fake**, não dinâmicos), preço, FAQ (também fixo). CTA usa `product.checkoutUrl`. Existe também `lib/landing-generator.ts` (gera seções de copy mais ricas por domínio, usado em outro fluxo) e `lib/v0-generator.ts`/`actions/v0.ts` (geram um prompt pra V0.dev, mas **não há chamada real à API do V0** — é só texto de prompt, nunca integrado de fato).
- **Decisão tomada**: não vamos tentar fazer o Claude gerar código de página customizado por produto em tempo real — ver Decisões Técnicas.

---

# Decisões Técnicas

1. **Deploy do app inteiro na Vercel, não um projeto por landing page.** O spec original previa V0.dev gerando um projeto Next.js separado por produto e publicando individualmente na Vercel. Decisão: usar a rota built-in `/p/[slug]` do próprio app (dados vêm do Postgres), publicando o app inteiro uma vez. **Motivo**: muito mais simples, sem custo do V0.dev, sem gerenciar N deploys, e a landing já fica pública automaticamente pra qualquer produto novo sem nenhum passo extra.

2. **Deploy via GitHub + Git integration da Vercel, não via `vercel` CLI direto.** Tentativa inicial foi rodar `vercel --prod` direto do diretório do monorepo — falhou porque o CLI, ao rodar de dentro de um subdiretório (`apps/web`), só envia aquele subdiretório, não o monorepo inteiro, quebrando a resolução de workspace (`workspace:*`). **Motivo da solução**: conectar a um repositório Git é o único jeito de habilitar a configuração "Root Directory" da Vercel (que só aparece nas settings quando há um Git remoto conectado) — sem isso, não há como o Vercel entender "a raiz do deploy é o monorepo, mas o app fica em `apps/web`".

3. **`apps/web/vercel.json` roda as migrations do banco automaticamente a cada build.** `buildCommand` é `pnpm --filter @maquina/shared --filter @maquina/database build && pnpm --filter @maquina/database db:migrate && next build`. **Motivo**: garantir que o banco de produção nunca fique fora de sincronia com o schema — isso já causou múltiplos bugs reais nesta sessão (ver Problemas Conhecidos / drift de schema).

4. **Banco de dados: Neon (Postgres serverless) em vez de Supabase.** O usuário tinha Supabase na lista original de integrações, mas ao configurar produção optei por Neon porque é parceiro nativo da Vercel (criação direto pelo painel, Storage → Marketplace), 100% compatível com o Postgres 16 já usado localmente, e o Supabase (auth/storage) não era necessário já que Better Auth já resolve autenticação.

5. **`ClaudeProvider` implementado mas não ativado.** O usuário pediu para trocar Gemini por Claude, mas ao investigar o custo (API paga por uso, não incluída na assinatura Claude Pro do claude.ai) o usuário decidiu manter Gemini ativo por enquanto e só deixar o código pronto. `defaultProvider` em `lib/ai/provider.ts` está como `"gemini"`; trocar para `"claude"` e configurar `ANTHROPIC_API_KEY` é a mudança necessária quando o usuário decidir migrar.

6. **Modelo Gemini trocado de `gemini-2.5-flash` para `gemini-3.1-flash-lite`.** Investigação direta na API revelou que `gemini-2.5-flash` está descontinuado para novos usuários (404), e `gemini-2.0-flash`/`gemini-2.5-flash` têm cota gratuita ZERO nesta conta especificamente (`limit: 0` retornado pela própria API). `gemini-3.1-flash-lite` é o único modelo de texto com cota gratuita real confirmada (15 RPM / 500 RPD). **Atenção**: isso foi descoberto testando a API ao vivo em agosto de 2026 — se uma nova sessão for debugar problemas de IA, vale reconfirmar via `https://generativelanguage.googleapis.com/v1beta/models` e `aistudio.google.com/rate-limit` antes de assumir qualquer modelo como correto, já que a Google muda essa política com frequência.

7. **Geração de imagem (capa de ebook) adiada.** Testado diretamente contra a API — todos os modelos de imagem (Nano Banana, Imagen 4) retornam cota zero nesta conta/projeto Gemini. Não implementado até o usuário decidir habilitar billing.

8. **Reddit abandonado como fonte de tendências (por enquanto).** Não é uma decisão de arquitetura, é uma limitação externa: a criação do app OAuth no Reddit (`reddit.com/prefs/apps`) falha consistentemente com erro `BAD_CAPTCHA_APPS` do lado do servidor do Reddit, mesmo com o captcha aparentemente resolvido corretamente, testado em múltiplos navegadores/dispositivos (desktop, incógnito, mobile, old.reddit.com). O código de integração (`lib/reddit.ts`, `actions/trend-import.ts`) está pronto e não foi tocado — só falta a credencial. O usuário optou por seguir com cadastro manual de tendências por enquanto.

9. **363 produtos duplicados apagados da conta Cakto real.** Auditoria encontrou 370 cópias idênticas de "A Estratégia Mestre" (mesmo nome/descrição/preço) — bug de loop/script anterior, batendo com o relato original de "172 duplicados" (que cresceu). Confirmado via API que a conta tinha **zero vendas registradas** (`/public_api/orders/` retornou `count: 0`) antes de apagar. Deleção é soft-delete (`status: "deleted"`, reversível em tese). Mantida 1 cópia como referência.

10. **Não usar Gamma nem tentar achar um "MCP do Gamma".** Avaliei a ideia do usuário de usar um MCP pra gerar imagens do ebook via Gamma — não existe API pública do Gamma que eu conheça. Recomendação: usar a própria geração de imagem do Gemini (Imagen/Nano Banana) quando a cota estiver disponível, em vez de depender de um serviço de terceiro sem integração conhecida.

---

# Convenções do Projeto

## Nomenclatura
- Tabelas do banco: `snake_case` (ex: `products`, `traffic_research`, `integration_settings`).
- Colunas: `snake_case` no banco, `camelCase` no código TS (Drizzle faz o mapeamento automaticamente via `varchar("nome_coluna")`).
- Arquivos de schema: um arquivo por tabela em `packages/database/src/schema/`, nome no singular do conceito (`products.ts`, `offers.ts`, `trends.ts`).
- Server Actions: sufixo `Action` (`generateCopyAssetsAction`), versão interna sem redirect: sufixo `Core` (`generateCopyAssetsCore`).
- Componentes React: `PascalCase`, um componente por arquivo, nome do arquivo em `kebab-case` (ex: `trend-card.tsx` exporta `TrendCard`).

## Organização de arquivos
- `app/(dashboard)/...` — todas as páginas autenticadas do dashboard, agrupadas pelo route group `(dashboard)` (não aparece na URL).
- `app/api/...` — Route Handlers (usados quando é preciso servir algo que não é HTML, como PDF, ou lidar com webhooks externos).
- `actions/` — Server Actions, um arquivo por domínio (`copy.ts`, `checkout.ts`, `ebooks.ts`, etc.), sempre com `"use server"` no topo.
- `lib/` — lógica de negócio pura, geradores de conteúdo, clients de API externa. Não deve ter `"use server"` a menos que seja de fato uma Server Action.
- `components/` — organizados por domínio em subpastas (`components/trends/`, `components/workspace/`, `components/landing/`, `components/ui/` para componentes genéricos de UI).
- `modules/factory/lib/` — o orquestrador do pipeline de criação (única instância desse padrão de "módulo" isolado no projeto).

## Estilo de código
- TypeScript com tipagem explícita nas funções exportadas.
- Sem comentários excessivos — comentários só onde a lógica não é óbvia (ex: por que `products.checkoutUrl` é atualizado a partir de `offers.caktoCheckoutUrl`).
- `async/await` em vez de `.then()` encadeado.
- Sem uso de classes exceto onde já existia um padrão (`FactoryRunner` é uma classe com método estático `run()`, `AIProviderManager`/`GeminiProvider`/`ClaudeProvider` são classes por seguirem o padrão de estado interno com inicialização).

## Componentes reutilizáveis (em `components/ui/`)
- `Button`, `Input`, `Label`, `Card`/`CardHeader`/`CardContent`/`CardTitle`, `Badge`, `StatusBadge`, `DashboardCard`, `EmptyState`, `PageHeader`, `Progress`.

## Boas práticas adotadas nesta sessão
- Nunca assumir que uma migration está aplicada — sempre validar com uma auditoria real (`information_schema.columns` vs `getTableColumns()` do Drizzle) antes de mexer em produção.
- Nunca confiar cegamente em nomes de modelo de IA "conhecidos" — testar direto contra a API antes de trocar em produção (o cutoff de conhecimento do Claude pode estar desatualizado em relação a modelos/cotas reais).
- Testar fluxos ponta a ponta em produção real (não só localmente) antes de considerar algo "pronto".
- Confirmar ausência de dados reais/vendas antes de qualquer ação destrutiva (soft-delete em massa de produtos Cakto).

---

# Arquivos Alterados (principais, desta sessão)

| Arquivo | Responsabilidade |
|---|---|
| `packages/database/drizzle/0002_products_cakto_columns.sql` até `0004_campaigns_landing_pages_columns.sql` | Migrations corrigindo drift de schema (colunas/tabelas que existiam em `schema.ts` mas nunca foram migradas: `integration_settings`, `ebooks`, `copy_assets`, `intelligence_reports`, `launch_events`, `launch_metrics`, `organic_distribution`, `project_factory_jobs`, `traffic_research`, colunas cakto_* em `products`/`offers`, colunas em `campaigns` e `landing_pages`) |
| `apps/web/src/modules/factory/lib/factory-runner.ts` | Orquestrador do pipeline — corrigido pra: (1) não pular a etapa de tráfego, (2) usar `generateProductFromTrend` quando há trend, (3) chamar as versões `Core` das actions em vez das que fazem `redirect()` |
| `apps/web/src/actions/copy.ts`, `organic-distribution.ts`, `intelligence.ts` | Separadas em `xxxAction` (com redirect) / `xxxCore` (sem redirect, usada pelo FactoryRunner) |
| `apps/web/src/lib/traffic-research-data.ts` | Extraído de `actions/traffic.ts` porque função síncrona não pode ser exportada de arquivo `"use server"` |
| `apps/web/src/app/(dashboard)/products/[id]/[[...tab]]/page.tsx` | Renomeada de `[id]/page.tsx` pra rota catch-all opcional — corrige 404 em quase todos os links da sidebar do produto |
| `apps/web/src/components/workspace/project-checklist.tsx` | Removido campo `icon` (violava fronteira Server→Client Component, causava crash) |
| `apps/web/src/lib/cakto.ts` | `createCaktoProduct()` (novo), `getCaktoProductOffers()` (novo), `createCaktoOffer()` (corrigido: checkoutUrl construído manualmente) |
| `apps/web/src/lib/providers/cakto/{cakto-client,products,offers}.ts` | Paths corrigidos de `/products`, `/offers`, `/oauth/token` para os reais `/public_api/products/`, `/public_api/offers/`, `/public_api/token/` |
| `apps/web/src/actions/checkout.ts` | `syncProductWithCaktoAction()` (novo — botão de sincronização automática), preço agora vem de `product.priceCents` |
| `apps/web/src/app/api/integrations/cakto/products/route.ts` | Checagem de idempotência antes de criar produto (evita duplicatas) |
| `apps/web/src/lib/ai/gemini.ts`, `providers/gemini/client.ts`, `app/api/integrations/gemini/test/route.ts`, `components/dashboard/ai-status.tsx` | Modelo trocado de `gemini-2.5-flash` → `gemini-2.0-flash` → `gemini-3.1-flash-lite` (só o último tem cota real) |
| `apps/web/src/lib/ai/claude.ts` | `ClaudeProvider` novo, registrado mas não ativado |
| `apps/web/src/lib/ebook-ai-generator.ts` | Novo — geração de conteúdo do ebook via IA com fallback pro template |
| `apps/web/src/lib/ebook-pdf.ts` | Novo — geração de PDF via `pdf-lib` |
| `apps/web/src/app/api/ebooks/[id]/pdf/route.ts` | Novo — Route Handler que serve o PDF |
| `apps/web/src/actions/ebooks.ts` | Usa `generateEbookContentWithAI` em vez do gerador de template puro |
| `apps/web/src/lib/landing-generator.ts` | Copy reescrito (tom menos agressivo/hype) |
| `apps/web/src/components/trends/trend-card.tsx` | Botão "Criar Produto" linkando pra `/products/new?trendId=X` |
| `apps/web/src/app/(dashboard)/products/new/page.tsx` | Aceita `?trendId=` via searchParams, pré-preenche tema |
| `apps/web/vercel.json` | Config de build (Root Directory, buildCommand com migration automática) |
| `.gitignore`, `apps/web/.gitignore` | Adicionado `.vercel` |
| `.env.example` | Documentadas todas as env vars realmente usadas no código (`GEMINI_API_KEY`, `ANTHROPIC_API_KEY`, `REDDIT_CLIENT_ID/SECRET`, `WEB_ORIGIN`, etc.) |

---

# Pendências (em ordem de prioridade)

1. **Copy de marketing pronta pra redes sociais** (WhatsApp, Facebook, Instagram) — etapa 5 do spec original, não implementada ainda. `copyAssets` já guarda `headlines`, `adCopies`, `ugcScripts`, `ctas`, `emailSequence` (ver `packages/database/src/schema/copy-assets.ts` e `actions/copy.ts`), mas não há UI/geração específica de "post pronto pra WhatsApp com link + CTA".
2. **Dashboard principal (`/`) usa dados mockados** — precisa ser conectado aos dados reais do usuário (produtos, vendas, receita). Hoje mostra "Bom dia, João", "Ebook Ansiedade", timeline fake — só a seção "Pendências" no rodapé é real.
3. **Página `/ebooks` não linka pra ebooks já gerados** — sempre mostra "Gerar Ebook" pra toda oferta, sem checar se já existe (`generateEbookFromOfferAction` também não faz upsert, então clicar de novo cria um ebook duplicado). Prioridade média — não quebra nada, mas é confuso.
4. **Capa/imagem do ebook** — bloqueada por cota de billing zero no Gemini para modelos de imagem. Requer decisão do usuário (habilitar billing no Google AI Studio) antes de eu poder implementar.
5. **Importação automática de tendências via Reddit** — código pronto, só falta credencial. Bloqueado por bug externo do Reddit (`BAD_CAPTCHA_APPS`). Tentar de novo periodicamente, ou considerar fonte alternativa (ex: buscar tendências via scraping de página pública, ou usar outra API de tendências).
6. **Abas placeholder do workspace do produto** (Pesquisa, Avatar, Criativos, Analytics, Receita, Timeline, Checklist, Arquivos) — hoje mostram "Em breve". Avaliar quais realmente valem a pena implementar.
7. **`retryProjectFactoryJob()`** em `actions/product-factory.ts` sempre lança erro "not implemented" — função morta/incompleta.
8. **Decidir o futuro do `apps/api` (Hono)** — parece legado e não usado pelo fluxo real. Avaliar se remove ou documenta o motivo de existir.
9. **Limpeza de dados de teste**: várias organizações/produtos de teste foram criados durante esta sessão (contas "Teste Local", "Teste QA", produtos como "Meditação para Ansiedade", "Dieta Cetogenica Express", "Dieta Low Carb Definitiva", "Yoga para Ansiedade" — este último já foi excluído). Vale limpar antes de uso real da plataforma.

---

# Problemas Conhecidos

1. **Reddit: criação de app OAuth falha com `BAD_CAPTCHA_APPS`.** Testado exaustivamente (desktop, incógnito, mobile, old.reddit.com, sem VPN/bloqueadores conhecidos) — a resposta do servidor do Reddit rejeita o token de captcha mesmo aparentemente resolvido corretamente. Causa raiz não identificada com certeza (pode ser detecção de automação do navegador usado, mesmo em tentativas manuais do usuário; pode ser bug temporário do lado do Reddit). Não é algo que o código do projeto pode corrigir.

2. **`apps/api` (Hono) parece não ser usado pelo fluxo de produção real.** Todas as funcionalidades reais passam por `apps/web` (Server Actions + Route Handlers). Não foi confirmado se algo depende de `apps/api` rodando — investigar antes de decidir removê-lo.

3. **Cota do Gemini é por modelo e mudou ao longo do tempo.** `gemini-2.5-flash` (descontinuado), `gemini-2.0-flash`/`gemini-2.5-flash` (cota zero nesta conta), `gemini-3.1-flash-lite` (funciona). Modelos de imagem: todos com cota zero. Isso é uma característica da conta Google específica do usuário, não do código — se o usuário trocar de conta/billing, os modelos disponíveis podem mudar. **Sempre reconfirmar via API antes de assumir.**

4. **Duas fontes de credenciais Cakto coexistem no código**: env vars (`CAKTO_CLIENT_ID`/`SECRET`, usadas só pelo client legado em `lib/providers/cakto/*` e pelos endpoints de teste) vs. tabela `integration_settings` por organização (usada pelo fluxo real em `lib/cakto.ts`). Isso pode confundir debugging futuro — importante lembrar qual caminho está ativo em cada bug.

5. **`ebooks` não tem coluna dedicada para capa/imagem** — se a geração de capa for implementada no futuro, decidir entre adicionar coluna (`coverImageUrl`) via migration, ou guardar dentro do `structure` jsonb (mais simples, sem migration).

6. **Sessão do Vercel CLI já está autenticada localmente** (`vercel whoami` → `jdpsufogjfkfjdk`), então deploys futuros via CLI devem funcionar sem novo login — mas o fluxo correto de deploy é `git push` (auto-deploy), não `vercel --prod` direto (ver Decisão Técnica #2).

7. **`.env`, `apps/web/.env`, `apps/api/.env` existem localmente e são gitignored** — nunca foram commitados, mas também nunca foram documentados num único lugar além deste handoff e do `.env.example`. Se uma nova sessão precisar rodar localmente, os valores reais (Cakto, Gemini) precisam ser buscados/recriados — não estão neste documento por segurança.

8. **Testes E2E automatizados: nenhum.** Todo o teste desta sessão foi manual, via browser automation, direto em produção. Não há suíte de testes (unitários ou E2E) no projeto.

---

# Contexto Importante

- O usuário (João) é o dono/operador do produto, não necessariamente um desenvolvedor experiente — prefere que eu explique e execute, não apenas sugira. Gosta de testar as coisas de verdade (produção) antes de considerar "pronto".
- Há outro projeto do usuário chamado "Nevion" (não relacionado a este, mencionado como "braçal mas escalável", rodando em paralelo).
- O usuário está aberto a decisões técnicas que eu recomendar, mas gosta de ser consultado antes de mudanças de arquitetura maiores (ex: perguntei antes de implementar Claude vs. manter Gemini, perguntei antes de apagar produtos duplicados da Cakto).
- **Cuidado com ações destrutivas/caras**: a conta Cakto é uma conta real com produtos reais (2 produtos legítimos pré-existentes: além dos de teste). Qualquer ação de exclusão em massa deve ser confirmada explicitamente e só depois de verificar ausência de vendas reais.
- O ambiente de desenvolvimento é Windows (PowerShell/Git Bash), o que já causou fricção (paths, `tsx` não encontrado direto, necessidade de rodar `pnpm install` e build de pacotes internos antes de qualquer typecheck funcionar).
- Memória de longo prazo do usuário já tem um registro deste projeto (`project_maquina_de_vendas.md` no sistema de memória do Claude) — pode estar desatualizado em relação a este handoff; **este handoff é a fonte mais recente e completa**.

---

# Próximos Passos

Quando a nova conversa começar, a primeira ação recomendada é:

1. **Ler este arquivo (`HANDOFF.md`) por completo antes de qualquer coisa.**
2. Confirmar que o ambiente ainda está no estado descrito aqui: rodar `git log --oneline -20` no repositório pra ver os commits mais recentes e confirmar que batem com o que está documentado aqui.
3. Verificar o estado do último deploy: `vercel ls web` (dentro de `apps/web` ou da raiz do monorepo, dependendo de onde o `.vercel/project.json` está) pra confirmar que a produção está `Ready` e não `Error`.
4. Perguntar ao usuário qual das Pendências ele quer atacar primeiro (a lista já está priorizada, mas a prioridade real é dele).
5. Se for mexer em qualquer coisa relacionada a modelos de IA (Gemini/Claude) ou cotas, **reconfirmar direto na API antes de assumir qualquer coisa deste documento como ainda válida** — essas informações mudam rápido e não são garantidas pelo código, são estado de conta externa.

---

# Prompt para Continuação

Copie e cole o texto abaixo em uma nova conversa:

```
Estou continuando o desenvolvimento do projeto "Máquina de Vendas", um SaaS de criação automática de infoprodutos (Next.js 15 + Drizzle + Postgres/Neon + Cakto + Gemini, monorepo pnpm/Turborepo, deploy na Vercel).

O projeto está em: C:\Users\joaov\Downloads\Maquina_de_Vendas-main\Maquina_de_Vendas-main
Repositório: Joa0Zera/maquina-de-vendas (GitHub, privado)
Produção: https://web-three-liard-77.vercel.app

Existe um arquivo HANDOFF.md na raiz do projeto com todo o contexto detalhado da sessão anterior: resumo do projeto, arquitetura, decisões técnicas, convenções, arquivos alterados, pendências priorizadas e problemas conhecidos.

Por favor:
1. Leia o HANDOFF.md por completo primeiro.
2. Rode `git log --oneline -20` pra confirmar que o histórico bate com o que está documentado.
3. Confirme que o deploy de produção está OK (vercel ls, dentro do diretório certo — checar HANDOFF.md pra detalhes do setup da Vercel).
4. Depois disso, me pergunte qual item da lista de Pendências (já priorizada no HANDOFF.md) eu quero atacar primeiro, ou aguarde eu te dizer o que fazer.

Não assuma que informações sobre cotas de API (Gemini) ou credenciais ainda são válidas sem reconfirmar — isso muda com frequência e está documentado no HANDOFF.md como "reconfirmar antes de usar".
```
