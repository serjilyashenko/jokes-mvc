# 🤡 JokesMVC: Spring Boot

This is a part of JokesMVC monorepo. Check the [root](../README.md) project.

## Stack

- Java 21
- Spring Boot 4
- Spring MVC + Thymeleaf (SSR)
- Spring Data JPA + PostgreSQL
- Flyway (migrations)
- Lombok

## Before running

Copy `.env.example` to `.env` and modify it if needed:

```bash
cp .env.example .env
```

Copy `application-local.properties.example` to `application-local.properties` and modify it if needed:

```bash
cp src/main/resources/application-local.properties.example src/main/resources/application-local.properties
```

`.env` is used by Docker Compose. `application-local.properties` is used by Spring Boot when running `./mvnw` on the host with the `local` profile.

## Run locally with docker-compose

Start Docker containers:

```bash
docker compose up -d --build
```
See [http://localhost:8080/jokes](http://localhost:8080/jokes) in your browser.

## Dev mode

Requires: [Java 21](https://adoptium.net/)

Start database Docker container:

```bash
docker compose up -d db
```

Run application:

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

See [http://localhost:8080](http://localhost:8080) in your browser.

## Migrations

Migrations are disabled so far. Re-enable `spring.flyway.enabled` when `src/main/resources/db/migration` is added.

## Run tests

```bash
./mvnw test
```

## Notes

- SSR Views (Thymeleaf)
- MVC architecture
- Spring Data JPA (Repository pattern)
- PostgreSQL
