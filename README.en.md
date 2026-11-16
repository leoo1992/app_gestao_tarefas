# Task Management API

An experimental Node.js/Express API with MySQL for creating, listing, updating, and deleting tasks.

## Requirements
- Node.js 22 or later
- MySQL with the `gestao_tarefas` database and `tarefas` table

## Local setup
1. Copy `.env.example` to `.env`.
2. Set `DB_USER` and `DB_PASSWORD`; adjust `DB_HOST` and `DB_NAME` if needed.
3. Install dependencies and start the API:

```bash
npm install
npm start
```

The application loads `.env` through Node's `--env-file` option. Keep the local environment file out of version control.

## Endpoints

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/tarefas` | List tasks |
| GET | `/tarefas/:id` | Retrieve a task |
| POST | `/tarefas` | Create a task |
| PUT | `/tarefas/:id` | Update a task |
| DELETE | `/tarefas/:id` | Delete a task |
