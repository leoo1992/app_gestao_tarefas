# Gestão de tarefas — API CRUD

API experimental em Node.js/Express com MySQL para criar, listar, atualizar e excluir tarefas.

## Pré-requisitos

- Node.js 22 ou posterior
- MySQL disponível com banco `gestao_tarefas` e tabela `tarefas`
- Conta de banco dedicada com as permissões necessárias (evite root)

## Configuração local

1. Copie `.env.example` para `.env`.
2. Preencha `DB_USER` e `DB_PASSWORD` com suas credenciais MySQL; ajuste `DB_HOST` e `DB_NAME` se necessário.
3. Execute `npm install` e depois `npm start`.

O Node.js carrega o arquivo local `.env` pelo argumento `--env-file`. O arquivo `.env` deve permanecer fora do Git. No ambiente de produção, forneça as variáveis por meio do gerenciador de segredos da plataforma e execute `node app.js`.

## Endpoints

| Método | Rota | Objetivo |
| --- | --- | --- |
| GET | `/tarefas` | Listar tarefas |
| GET | `/tarefas/:id` | Consultar tarefa |
| POST | `/tarefas` | Criar tarefa |
| PUT | `/tarefas/:id` | Atualizar tarefa |
| DELETE | `/tarefas/:id` | Remover tarefa |

## Segurança e qualidade

O código não armazena mais a senha MySQL diretamente. A infraestrutura auxiliar de qualidade no repositório não substitui testes de integração da API com um banco de teste; esses testes e a validação de CI ainda precisam ser implementados e aprovados.
