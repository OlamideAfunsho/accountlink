-- Create accountlink database if it doesn't exist
-- Run this in pgAdmin or psql to set up the database

CREATE DATABASE accountlink
  WITH
  ENCODING 'UTF8'
  LC_COLLATE 'en_US.UTF-8'
  LC_CTYPE 'en_US.UTF-8';

-- Grant privileges to postgres user (should already be owner)
GRANT ALL PRIVILEGES ON DATABASE accountlink TO postgres;

-- Connect to the database and enable extensions if needed
\c accountlink;

-- Optional: Create uuid extension for UUID support
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
