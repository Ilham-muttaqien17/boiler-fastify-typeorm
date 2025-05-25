# Boilerplate Fastify TypeORM

A boilerplate for building REST APIs using **Fastify**, **TypeORM**, and **TypeScript**.

## Table of Contents

- [Pre-requirements](#pre-requirements)
- [Installation](#installation)
- [Scripts](#scripts)
- [Usage](#usage)

## Pre-requirements

Before running this application, ensure you have the following installed and configured on your system:

1. **Redis**: 
   - Redis is used for caching or queue management.
   - Installation guide: [Redis Official Documentation](https://redis.io/docs/getting-started/installation/)

2. **PostgreSQL**:
   - The application uses PostgreSQL as the primary database.
   - Installation guide: [PostgreSQL Official Documentation](https://www.postgresql.org/download/)

Ensure both services are running and accessible before proceeding with the installation steps.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ilham-muttaqien17/boiler-fastify-typeorm
   cd boiler-fastify-typeorm
   ```
2. **Install dependencies**:
    ```bash
    npm install
    ```
3. **Environment Configuration**:

    Copy the `config/.env.example` file to `config/.env` to configure your environment variables.


## Scripts

| Command                                                                   | Description                                               |
|---------------------------------------------------------------------------|-----------------------------------------------------------|
| `npm run prepare`                                                         | Sets up git hooks using `simple-git-hooks`.               |
| `npm run typecheck`                                                       | Perform type checking on each TypeScript file.           |
| `npm run dev`                                                             | Starts the app in development mode with TypeScript.       |
| `npm run build`                                                           | Cleans the `dist` directory and compiles TypeScript files.|
| `npm start`                                                               | Starts the app in production mode with module aliasing.   |
| `npm run lint`                                                            | Lints TypeScript files using ESLint.                      |
| `npm run commitlint`                                                      | Lints commit messages.                                    |
| `npm run entity:create ./src/db/entities/<your_entity_name>.ts`           | Creates a new TypeORM entity.                             |
| `npm run migration:create ./src/db/migrations/<your_migration_name>.ts`   | Creates a new TypeORM migration file.                     |
| `npm run migration:generate ./src/db/migrations/<your_migration_name>.ts` | Generates a migration file based on schema changes.       |
| `npm run migration:run`                                                   | Runs all pending TypeORM migrations.                      |
| `npm run migration:revert`                                                | Reverts the last executed migration.                      |
| `npm run migration:show`                                                  | Displays the status of all migrations.                    |
| `npm run seed:create ./src/db/seeds/<your_seeder_name>.ts`                | Creates a new database seed file.                         |
| `npm run seed:run`                                                        | Executes all seed files to populate the database.         |
| `npm run seed:revert`                                                     | Reverts the last seed operation.                          |
| `npm run db:create`                                                       | Creates the database specified in the configuration.      |
| `npm run db:drop`                                                         | Drops the specified database.                             |
| `npm run db:refresh`                                                      | Drops and recreates the database.                         |


## Usage

### Database Setup

Before using the application, you need to create the database. This can be done using the following command:

```bash
npm run db:create
```

### Development Mode

To run the application in development mode, use the following command:

```bash
npm run dev
```

### Production Mode

To run the application in production mode, use the following command:
1. **Build the application**:
   ```bash
   npm run build
   ```
2. **Start the application**:
   ```bash
   npm run start
   ```

The app will be available at `http://localhost:3300` by default.