#!/bin/bash

# Run PostgreSQL
docker-compose -f ./docker-compose.tests.yml --env-file ./.env.jest up -d

# Wait for PostgreSQL to become ready
until docker exec db-challenge-tests pg_isready -U postgres; do
  echo "PostgreSQL is not ready yet, waiting..."
  sleep 3
done

echo "PostgreSQL is ready!"

npm install

dotenv -e .env.jest npx sequelize-cli db:drop
dotenv -e .env.jest npx sequelize-cli db:create
dotenv -e .env.jest npx sequelize-cli db:migrate

npm run test:jest
