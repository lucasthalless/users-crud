# CRUD de Usuários &middot; <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a> <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<!-- <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a> -->
</p>

## Descrição

CRUD de usuários em GraphQL utilizando NestJS, TypeORM e MySQL.

Os usuários possuem seus dados de nome, email e senha junto com possíveis configurações da sua conta em um sistema. Essa configuração é armazenada no banco de dados através de um relacionamento um-para-um. A arquitetura do projeto foi criada a partir da CLI do NestJS.

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

e a API vai estar disponível na porta [:3000](http://localhost:3000/).

Para conseguir o token de autenticação para testar a API, utilize a rota POST [**/auth/signup**](localhost:3000/auth/signup) para criar uma conta, enviando os dados "name", "email" e "password" no Body x-www-form-urlencoded do Request.
Após isso basta logar com seu "email" e "password" no Body x-www-form-urlencoded do Request na rota [**auth/signin**](localhost:3000/auth/signin) e ela retornará o token jwt.

Disponibilizei uma collection do Postman com tudo isso pronto para facilitar esse processo [aqui](https://github.com/lucasthalless/users-crud/blob/main/users-crud.postman_collection.json) :)

Utilize a rota [/graphql](http://localhost:3000/graphql) para testar as querys e mutations, com o header authorization: "Bearer *seu-token-jwt*".

<details> 
<summary> Queries e Mutations ↴</summary>
<br>

- getUsers
```
{
	getUsers {
    id
    name
    email
    settings {
      userId
      receiveEmails
      receiveNotifications
    }
  }
}
```

- getUser
```
{
  getUser(id: 1) {
    id
    name
    email
    password
    settings {
      userId
      receiveEmails
      receiveNotifications
    }
  }
}
```

- createUser
```
mutation {
  createUser (createUserInput: {name: "maria", email: "maria@gmail.com", password: "m4r14"}){
    id
    name
    email
    password
    settings {
      userId
      receiveEmails
      receiveNotifications
    }
  }
}
```

- updateUser
```
mutation {
  updateUser (id: 1, updateUserInput: {name:"maria", email: "maria@gmail.com", password:"maria123"}){
    id
    name
    email
    password
    settings {
      userId
      receiveEmails
      receiveNotifications
    }
  }
}
```

- removeUser
```
mutation {
  removeUser (id: 1)
}
```

- createUserSettings
```
mutation {
  createUserSettings (createUserSettingsInput: {userId: 22, receiveEmails: false, receiveNotifications: true}) {
    userId
    receiveEmails
    receiveNotifications
  }
}
```

- updateUserSettings
```
mutation {
  updateUserSettings (userId: 22, updateUserSettingsInput: {receiveEmails: true, receiveNotifications: true}) {
    userId
    receiveEmails
    receiveNotifications
  }
}
```

</details>
<!-- ## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
``` -->
