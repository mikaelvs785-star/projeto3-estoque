# ---------- ETAPA 1: build ----------
FROM gradle:jdk25 AS build
WORKDIR /app

COPY build.gradle settings.gradle* ./
COPY src ./src

RUN gradle clean bootJar -x test --no-daemon

# ---------- ETAPA 2: run ----------
FROM eclipse-temurin:25-jre-alpine
WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]