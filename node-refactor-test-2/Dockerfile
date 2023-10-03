# Install dependencies
FROM node:18-slim AS deps

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

# Production build
FROM node:18-slim AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Production runtime
FROM node:18-slim AS prod

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

EXPOSE 8080

CMD npm run start:prod

# Development runtime
FROM node:18-slim AS dev

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./
COPY nodemon.json ./nodemon.json
COPY jsconfig.json ./jsconfig.json
COPY . .

CMD npm run start:dev
