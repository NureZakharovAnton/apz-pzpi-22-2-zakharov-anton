# Job Management System Backend

[![NestJS](https://img.shields.io/badge/NestJS-10.0.0-red.svg)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/cloud/atlas)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

A NestJS-based backend application for managing job postings, proposals, and payments with IoT device integration.

## Features

- 🔐 User authentication with JWT
- 💼 Job posting management
- 📝 Proposal submission and tracking
- 💳 Payment processing
- 📧 Email notifications
- 💾 Database backup/restore functionality
- 🔄 IoT device status display integration

## Prerequisites

- Node.js 20.x
- MongoDB Atlas account
- Docker and Docker Compose
- Email service credentials (for notifications)

## Installation

```bash
# Install dependencies
yarn install
```

## Environment Setup

Create `.env` file in root directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

## Running the Application

```bash
# Development
yarn start:dev

# Production
yarn build
yarn start:prod

# Using Docker
docker-compose up --build
```

## Scripts

| Command | Description |
|---------|-------------|
| `yarn build` | Build the application |
| `yarn start:dev` | Run in development mode with hot reload |
| `yarn start:prod` | Run in production mode |
| `yarn lint` | Run ESLint |
| `yarn test` | Run unit tests |
| `yarn test:e2e` | Run end-to-end tests |
| `yarn test:cov` | Generate test coverage report |

## Database Backup/Restore

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/backups/create` | POST | Create new backup |
| `/backups/restore/{backup-name}` | POST | Restore specific backup |
| `/backups` | GET | List all backups |

## Main Dependencies

| Package | Version | Description |
|---------|---------|-------------|
| @nestjs/common | ^10.0.0 | NestJS core |
| @nestjs/mongoose | ^10.1.0 | MongoDB integration |
| @nestjs/jwt | ^10.2.0 | JWT authentication |
| @nestjs-modules/mailer | ^2.0.2 | Email functionality |
| bcrypt | ^5.1.1 | Password hashing |
| class-validator | ^0.14.1 | DTO validation |

## Docker Support

```bash
# Build and run with Docker
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop containers
docker-compose down
```

## Testing

```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# Test coverage
yarn test:cov
```

## Project Structure

```
src/
├── modules/
│   ├── auth/
│   ├── jobs/
│   ├── users/
│   ├── payments/
│   └── backups/
├── common/
│   ├── guards/
│   ├── decorators/
│   └── filters/
└── main.ts
```
