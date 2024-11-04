
# 🚀 Prova PS Infinity Brasil

Esse projeto é o Back-end da prova para vaga de Analista de Desenvolvimento Junior.


## 🔍 Índice

-  <a href="#funcionalidades">Funcionalidades</a>
-  <a href="#fluxograma">Fluxograma</a>
-  <a href="#-configuração">Configuração</a>
-  <a href="#-ferramentas-de-build">Ferramentas de Build e Execução de Código</a>
-  <a href="#-ORM-bdd">ORM e Banco de Dados</a>
-  <a href="#-autenticacao-segurança">Autenticação e Segurança</a>
-  <a href="#-agendamento-de-tarefas">Agendamento de Tarefas</a>
-  <a href="#-pdf-relatorios">PDF e Relatórios</a>
-  <a href="#-validacao-dados">Validação de dados</a>
-  <a href="#-utilitatios-ambiente">Utilitários de Ambiente</a>
-  <a href="#-autor">Autor</a>
-  <a href="#-licença">Licença</a>

## Funcionalidades

- Cadastro de usuários: Empresas ou entregadores;
- Empresas podem criar fretes e entregadores podem criar veículos e solicitar fretes disponíveis para entrega;
- Usuários podem editar seus perfis;
- Entregadores podem editar seus veículos;
- Empresas podem editar seus fretes contanto que os mesmos estejam disponíveis e não em andamento/entregues;
- Entregadores podem visualizar todos os fretes marcados como disponíveis e podem solicitar para realizarem entregas;
- Empresas podem visualizar todas as solicitações em relação aos fretes que elas criaram e, além disso, podem aceitar ou rejeitar a solicitação;
- Entregadores conseguem mudar o status do frente;
- Entregadores conseguem visualizar os fretes em andamento/entregues por eles;
- Entregadores e empresas tem acesso aos fretes finalizados que estão relacionados à eles;
- Todos os dias, às 08:00 da manhã, um relatório com os fretes finalizados no dia anterior é emitido, tanto para empresas quanto para entregadores.


## Fluxograma

O fluxograma foi criado por mim e pode ser acesso em: https://drawsql.app/teams/raco/diagrams/infinitybrasil


## 🎨 Configuração

- @rocketseat/eslint-config e eslint
- Configura o estilo de código e aplica boas práticas. @rocketseat/eslint-config define regras específicas de formatação, enquanto eslint executa o linting no código.
- Instalação:


        $ npm install eslint @rocketseat/eslint-config --save-dev
## 🛠 Ferramentas de Build e Execução de Código

- TypeScript: Superset de JavaScript que adiciona tipagem estática, melhorando a segurança do código.
- tsup: Empacota o projeto TypeScript para produção.
- tsx: Permite executar arquivos TypeScript diretamente, sem compilação prévia.
- Instalação:

        $ npm install typescript tsup tsx @types/node --save-dev


## 🛠 ORM e Banco de Dados

- prisma e @prisma/client
- Prisma: Um ORM que facilita interações com o banco de dados e migrações de esquema.
- @prisma/client: Cliente gerado automaticamente para acesso ao banco de dados.
- Instalação:

        $ npm install prisma @prisma/client --save-dev

- Nessa aplicação, foi utilizado o Docker. Acesse o dockerhub para ter acesso à documentação da imagem da bitnami/postgresql.
- Para subir o banco, utilize o seguinte comando:

        $ docker compose up -d



## ❗️Autenticação e Segurança

- bcryptjs, @fastify/cookie, e @fastify/jwt
- bcryptjs: Biblioteca para hash de senhas, usando o algoritmo bcrypt.
- @fastify/cookie: Plugin para Fastify que gerencia cookies, essencial para sessões.
- @fastify/jwt: Plugin para autenticação JWT no Fastify.
- Instalação:

        $ npm install bcryptjs @types/bcryptjs @fastify/cookie @fastify/jwt

## Agendamento de Tarefas

- node-cron
- Biblioteca para agendar tarefas com sintaxe cron no Node.js. Ideal para operações recorrentes como geração de relatórios.
- Instalação:

                $ npm install node-cron @types/node-cron

## PDF e Relatórios

- pdfmake e @types/pdfmake
- pdfmake: Gera documentos PDF diretamente no Node.js, essencial para criar relatórios.
- @types/pdfmake: Fornece tipos para pdfmake no TypeScript.
- Instalação:

                $ npm install pdfmake @types/pdfmake
## Validação de dados

- zod
- Biblioteca para validação de dados e definição de esquemas, essencial para APIs seguras e formulários.
- Instalação:

                $ npm install zod
## Utilitários de Ambiente

- dotenv
- Carrega variáveis de ambiente de um arquivo .env para process.env, essencial para configurar variáveis sensíveis.
- Instalação:

                $ npm install dotenv

## 🙂 Autor
Feito por Rafael Coelho Reis, [@raco1](https://www.github.com/raco1)! Acompanhe-me no LinkedIn: [Rafael Coelho](https://www.linkedin.com/in/rafael-coelho-reis-873181204/) 👋


## 📖 Licença

[![NPM](https://img.shields.io/github/license/raco1/rocket-movies-api)](https://github.com/raco1/Desafio-Final-Explorer/blob/main/LICENSE.md)

