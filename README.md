# 🚀 NestJS Project with Rust Integration & Prisma ORM

This project is a powerful backend application built using [NestJS](https://nestjs.com/) and integrates with a Rust-based API. It leverages [Prisma ORM](https://www.prisma.io/) for database access and applies best practices in modular architecture, validation, error handling, logging, and security.

---

## 🧩 Technologies Used

- **NestJS** – Scalable Node.js framework with TypeScript.
- **Rust API** – High-performance microservice integration.
- **Prisma ORM** – Type-safe database access layer.
- **DTOs & Pipes** – Input validation and transformation.
- **Global Exception Filters** – Consistent error handling.
- **LoggerService** – Centralized, file-based logging.
- **Throttler** – Rate limiting using `@nestjs/throttler`.
- **CORS** – Cross-origin request protection.

---

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Eslam-Nazer/nestjs_project.git
cd nestjs_project

npm install
```

### 2. Configure Environment Variables
Create a .env file in the root:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/your_db?schema=public"

### 3. Generate Prisma Client

npx prisma generate

### 5. (Optional) Apply Migrations

npx prisma migrate dev --name init

## 📦 Scripts

- npm run start         Start the app
- npm run start:dev      Start in development mode
- npm run build          Compile the app
- npm run test           Run unit tests
- npm run test:e2e       Run end-to-end tests
- npm run lint           Lint the code

## LoggerService
### Logs are saved under:
/logs/nest.log
