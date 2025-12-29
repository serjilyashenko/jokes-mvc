# 🤡 JokesMVC: NestJS

This is a part of JokesMVC monorepo. Check the [root](./README.md) project. 

## Run locally with docker-compose

Copy `.env.example` to `.env` and modify it if needed:
```bash
cp .env.example .env 
```
Generate secrets and put them into `.env`:
```bash
sed -i '' "s/secret_64/$(openssl rand -hex 64)/" .env   # macOS
sed -i "s/secret_64/$(openssl rand -hex 64)/" .env      # Linux
```
Start Docker containers:
```bash
docker compose up -d
```
See [http://localhost:8080/jokes](http://localhost:8080/jokes) in your browser.

## Dev mode

Copy `.env.example` to `.env` and modify it if needed:
```bash
cp .env.example .env 
```
Generate secrets and put them into `.env`:
```bash
sed -i '' "s/secret_64/$(openssl rand -hex 64)/" .env   # macOS
sed -i "s/secret_64/$(openssl rand -hex 64)/" .env      # Linux
```
Start database Docker container:
```bash
docker compose up -d db
```
Install dependencies:
```bash
corepack enable
pnpm install
```
Run application locally:
```bash
pnpm start:dev
```
See [http://localhost:8080](http://localhost:8080) in your browser.\
Or [http://localhost:8080/api](http://localhost:8080/api) for swagger api docs.

## Migrations

> ⚠️ Migrations are run during the app start

Generate new migration
```bash
typeorm-ts-node-commonjs migration:generate -d ./src/data-soruce.ts ./src/migrations/<migration_name>
```

## Notes

- SSR Views + API
- MVC architecture
- Repository pattern + Dependency Inversion
- ApiDTOs and ViewDTOs


- TypeOrm
- PostgreSQL
- Docker (2 modes: local server + docker DB; all in docker)


> ⚠️ All info below are from NestJS official repo.\
> TODO: Modify it to fit JokesMVC project.


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
