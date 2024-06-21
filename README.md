# CRUD de Usuários &middot; <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a> <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<!-- <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a> -->
</p>

## Descrição

CRUD de usuários em GraphQL utilizando NestJS, TypeORM e MySQL.

A arquitetura do projeto foi criada a partir da CLI do NestJS.

## Instalação / Execução

Clone esse repositório e dentro dele execute:

```shell
docker-compose up
```

Após o docker iniciar o banco de dados MySQL, em outro terminal execute os comandos:

```shell
npm install
npm run start:dev
```

e a API vai estar disponível junto com o banco de dados populado na porta [:3000](http://localhost:3000/).

Para conseguir o token de autenticação para testar a API, utilize a rota POST [/auth/signup](localhost:3000/auth/signup) para criar uma conta, enviando os dados "name", "email" e "password" no Body x-www-form-urlencoded do Request.
após isso basta logar com seu "email" e "password" no Body x-www-form-urlencoded do Request na rota [auth/signin](localhost:3000/auth/signin) e ela retornará o token jwt.

utilize a rota [/graphql](http://localhost:3000/graphql) para testar as querys e mutations, com o header authorization: "Bearer *seu-token-jwt*".
<!-- ## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
``` -->
