# Sistema de Controle de Estoque

## Como rodar

### Banco de dados (Postgres via Docker)
```
cd backend
docker compose up -d
```

### Backend (Spring Boot + Gradle + Java 25)
```
cd backend
./gradlew bootRun
```
API em `http://localhost:8082`.

### Frontend (React + Vite)
```
cd frontend
npm install
npm run dev
```
Frontend em `http://localhost:5175`.

## Atividade

Cadastrem categorias, produtos, e registrem movimentacoes de ENTRADA e SAIDA.
Prestem atencao especial no que acontece com o estoque apos uma ENTRADA, e no
que acontece quando uma SAIDA e maior que o estoque disponivel.
