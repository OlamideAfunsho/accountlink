# Database Setup Guide

## Prerequisites
- Docker and Docker Compose installed on your system

## Quick Start

### 1. Start PostgreSQL (one-time setup)
```bash
docker-compose up -d
```

This will:
- Start PostgreSQL 16 on `localhost:5432`
- Create a database called `accountlink`
- Create user `postgres` with password `postgres`
- Persist data in a Docker volume

### 2. Verify Connection
Check if the database is running:
```bash
docker-compose ps
```

You should see the `postgres` container running.

### 3. Start the NestJS Server
In a new terminal:
```bash
npm run start:dev
```

The server will:
- Connect to PostgreSQL
- Auto-create the `customers` table (thanks to `synchronize: true`)
- Start listening on `http://localhost:3000`

## Database Management

### Stop the database
```bash
docker-compose down
```

### Remove all data (reset database)
```bash
docker-compose down -v
```

### View PostgreSQL logs
```bash
docker-compose logs postgres
```

### Connect to database directly (optional)
If you have `psql` installed:
```bash
psql -h localhost -U postgres -d accountlink
```

Then run SQL:
```sql
\dt  -- Show all tables
SELECT * FROM customers; -- View all customers
```

## Environment Variables

Edit `.env` file to change database credentials:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=accountlink
```

## Troubleshooting

**"Cannot connect to database"**
- Make sure `docker-compose up -d` is running
- Check with `docker-compose ps`
- View logs with `docker-compose logs postgres`

**"Database already exists"**
- Run `docker-compose down -v` to reset completely
- Then `docker-compose up -d` again

**Port 5432 already in use**
- Edit `docker-compose.yml` and change the first `5432` to another port (e.g., `5433:5432`)
- Update `DB_PORT` in `.env` to match

## Next Steps
- Create more entities (VirtualAccounts, PaymentEvents, etc.)
- Run migrations
- Test the API endpoints
