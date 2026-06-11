# 🤡 JokesMVC: Spring Boot

This is a part of JokesMVC monorepo. Check the [root](../README.md) project.

## Stack

- Java 21
- Spring Boot 4
- Spring MVC + Thymeleaf (SSR)
- Spring Data JPA + PostgreSQL
- Flyway (migrations)
- Lombok

## Run locally with docker-compose

Start Docker containers:
```bash
docker compose up -d
```
See [http://localhost:8080/jokes](http://localhost:8080/jokes) in your browser.

## Dev mode

Start database Docker container:
```bash
docker compose up -d db
```
Run application:
```bash
./mvnw spring-boot:run
```
See [http://localhost:8080](http://localhost:8080) in your browser.

## Migrations

TBD

## Run tests

TBD

## Notes

- SSR Views (Thymeleaf)
- MVC architecture
- Spring Data JPA (Repository pattern)
- PostgreSQL
- Docker
