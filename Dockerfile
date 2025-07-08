# Build da aplicação
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

# Imagem final
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY .env ./
COPY docker-entrypoint.sh .

RUN yarn install --production
RUN chmod +x docker-entrypoint.sh

CMD ["./docker-entrypoint.sh"]
