#!/bin/sh

echo "🚀 Iniciando container da API..."
echo "⏳ Aguardando o banco estar disponível..."

# Aguarda o banco responder na rede Docker (host = nome do serviço 'db')
until nc -z db 5432; do
  echo "⏳ Esperando pelo PostgreSQL..."
  sleep 2
done

echo "🧱 Rodando migrations..."
yarn migrate

echo "✅ Iniciando aplicação..."
node dist/main.js
