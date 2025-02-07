# EeasySaaS
## Table of Contents
- [Description](#description)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)

## Description
EasySaaS is a starter repository for building SaaS applications using NestJS, with a focus on identity and security. It can also be used as an identity microservice in enterprise solutions.

## Project Structure

```
easy-saas/
├── src/
│   ├── common/
│   │   ├── decorators/
│   │   ├── enums/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── pipes/
│   │   └── utils/
|   |
│   ├── config/
│   │   └── data-source.ts
|   |
│   ├── db/
│   │   └── migrations/
│   │       
│   ├── modules/
|   |
│   ├── shared/
│   │   ├── dtos/
│   │   ├── entities/
│   │   └── interfaces/
│   │       
│   ├── main.js
│   └── app.module.js
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone git@github.com:odainasser/easy-saas.git
   cd easy-saas
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Run migrations:
   ```sh
   npm run migration:run
   ```

4. Start the application:
   ```sh
   npm run start
   ```