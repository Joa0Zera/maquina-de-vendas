# Máquina de Vendas

**AI Infoproduct Operating System** — fábrica de infoprodutos com IA: tendências, produtos, landing pages, campanhas, checkout e analytics.

## Requisitos

- Node.js 20+
- pnpm 9+
- Docker (PostgreSQL e Redis)

## Início rápido (MVP Fase 1)

```bash
pnpm install
docker compose up -d
cp .env.example .env
# Edite .env: BETTER_AUTH_SECRET e CAKTO_WEBHOOK_SECRET
pnpm db:migrate
pnpm dev
```

- Dashboard: http://localhost:3000 (login obrigatório)
- Landing pública: http://localhost:3000/p/seu-slug
- Webhook Cakto: `POST http://localhost:3000/api/webhooks/cakto`

> Banco novo ou schema antigo: `docker compose down -v && docker compose up -d` antes de `pnpm db:migrate`.

## Módulos

| Módulo | Rotas API |
|--------|-----------|
| Trend Engine | `/trends` |
| Product Factory | `/products`, `/offers` |
| Landing Generator | `/landing-pages` |
| Campaign Engine | `/campaigns` |
| Checkout | `/integrations`, `/sales` |
| Analytics | `/analytics` |

Ver [ARCHITECTURE.md](./ARCHITECTURE.md).

## Estrutura

```
apps/api/src/modules/   # Um diretório por módulo de negócio
apps/web/               # Dashboard Next.js
packages/database/      # Schema Drizzle
packages/shared/        # Tipos e Zod compartilhados
```
