# Backend Receitas

API REST para cadastro e gerenciamento de receitas culinarias, com autenticacao JWT, documentacao Swagger e banco MySQL.

## Tecnologias

- Node.js
- TypeScript
- Express
- Sequelize + sequelize-cli
- MySQL
- Zod
- JWT (jsonwebtoken)
- Swagger (swagger-jsdoc + swagger-ui-express)
- Winston
- Vitest
- Docker + Docker Compose

## Estrutura de pastas

```text
src/
  configs/        # configuracoes globais (cors, logger, rotas, swagger)
  domains/        # regras de negocio por dominio (authentication, recipes, categories, users)
  infra/          # camada de infraestrutura (database, migrations, seeders)
  middlewares/    # middlewares compartilhados
  server.ts       # bootstrap da aplicacao

tests/
  domains/        # testes por dominio
  mocks/          # mocks de apoio
```

## Pre-requisitos

Opcao 1 (Docker):

- Docker
- Docker Compose

Opcao 2 (Local):

- Node.js 20+
- npm
- MySQL 8

## Variaveis de ambiente

Use o arquivo `.env.example` como base e crie o `.env`.

Variaveis principais:

- `PORT`
- `NODE_ENV`
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_DIALECT`
- `DB_ROOT_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`

## Como executar com Docker (recomendado)

1. Suba os containers:

```bash
docker compose up --build
```

2. API disponivel em:

- `http://localhost:3000`
- Docs Swagger: `http://localhost:3000/docs`

Observacoes:

- Na primeira inicializacao, o entrypoint roda create/migrate/seed automaticamente.
- O MySQL fica exposto na porta `3307` do host.

## Como executar localmente (sem Docker)

1. Instale dependencias:

```bash
npm install
```

2. Ajuste o `.env` para ambiente local, normalmente:

- `DB_HOST=localhost`
- `DB_PORT=3307` (ou a porta do seu MySQL local)

3. Rode migrations e seeders:

```bash
npm run db:migrate
npm run seed:run
```

4. Inicie em modo desenvolvimento:

```bash
npm run dev
```

## Scripts uteis

- `npm run dev`: sobe a API com hot reload
- `npm run build`: gera build TypeScript
- `npm run start`: executa build gerado
- `npm run lint`: executa ESLint
- `npm run test`: executa testes com Vitest
- `npm run test:coverage`: cobertura de testes
- `npm run db:migrate:create -- --name nome_migration`: cria migration
- `npm run db:migrate`: executa migrations
- `npm run seed:create -- --name nome_seed`: cria seeder
- `npm run seed:run`: executa seeders

## Rotas principais

- `GET /` - health basico da API
- `GET /docs` - documentacao Swagger
- `POST /v1/auth/*` - autenticacao
- `GET/POST/PUT/DELETE /v1/recipes/*` - receitas
- `GET /v1/categories/*` - categorias

## Testes

```bash
npm run test
```

## Dicas de troubleshooting

- Se o banco ja tiver estado antigo e voce quiser reiniciar do zero no Docker:

```bash
docker compose down -v
docker compose up --build
```

- Se ocorrer conflito de seed (dados duplicados), valide se o banco nao esta reaproveitando volume antigo.
