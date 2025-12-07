# TANDAS Backend API

REST API para plataforma educativa de tratamiento de agua.

## Stack

- Bun
- Express.js 5
- PostgreSQL + Prisma ORM
- Better Auth

## Setup

```bash
cp .env.example .env
# Editar .env con credenciales reales
bun install
bunx prisma migrate dev
bun run dev
```

## Docker

### Con Docker Compose (recomendado)

```bash
docker-compose build
docker-compose up -d
```

### Build manual con secrets

```bash
./build.sh
```

O manualmente:

```bash
docker build --secret id=DATABASE_URL,env=DATABASE_URL -t tandas-rest-api .
docker run --env-file .env -p 3000:3000 tandas-rest-api
```

## Secrets

DATABASE_URL se pasa como Docker secret durante el build (solo para `prisma generate`).
No queda guardada en la imagen final.
En runtime se inyecta desde .env de forma segura.
