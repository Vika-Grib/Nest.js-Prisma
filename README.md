<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest



## Description
Тестовое задание для Node.js разработчика (Nest.js + Prisma)

## Installation
```bash
$ npm install
```

Шаг 1: Инициализация проекта
Настройка базового Nest.js проекта
Создание проекта Nest.js с помощью CLI: 
```$ nest new new_1```
Интеграция Prisma и настройка базы данных PostgreSQL
Установка Prisma CLI: 
```$ npm install prisma --save-dev ```
Инициализация Prisma в проекте: 
``` $ npx prisma init ```
Настройка подключения к PostgreSQL в файле .env и prisma/schema.prisma.


Шаг 2: Создание схемы базы данных
Определение модели в Prisma
Модель User с полями id, email, password, role, createdAt, updatedAt.
Модель Post с полями id, title, content, userId, createdAt, updatedAt.

```model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  role      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}```
Выполнение миграций: npx prisma migrate dev.

Шаг 3: Реализация API эндпоинтов
Аутентификация и авторизация
```$ npm install @nestjs/jwt @nestjs/passport passport passport-jwt
$ npm install @types/passport-jwt --save-dev```

## Настройка модуля аутентификации
```nest generate module auth
nest generate service auth
nest generate controller auth```

##  Установка Prisma
```$ npm install prisma --save-dev
$ npm install @prisma/client```


## Running the app

```bash
# development
$ npm run start
$ npm run build


# watch mode 
$ npm run start:dev

# production mode
$ npm run start:prod
```

 # Сборка проекта
```
$ npm run build
```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```



