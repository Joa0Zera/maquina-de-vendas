# Módulos da API

Cada pasta representa um **módulo de negócio** do Infoproduct OS.

| Pasta | Rotas |
|-------|--------|
| `trend-engine` | `/trends` |
| `product-factory` | `/products`, `/offers` |
| `landing-generator` | `/landing-pages` |
| `campaign-engine` | `/campaigns` |
| `checkout` | `/integrations`, `/sales` |
| `analytics` | `/analytics` |
| `assets` | `/assets` (artefatos IA transversais) |

Registro central: `index.ts` → `registerModuleRoutes()`.

Futuro (não implementar ainda): `services/`, `jobs/` por módulo; filas Redis; automação browser.
