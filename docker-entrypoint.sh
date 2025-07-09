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

# Só continua se as migrations foram bem-sucedidas
if [ $? -eq 0 ]; then
  echo "✅ Migrations concluídas com sucesso."

  echo "🌱 Verificando necessidade de seeders..."
  COLAB_COUNT=$(PGPASSWORD=$DB_PASS psql -h $DB_HOST -U $DB_USER -d $DB_NAME -t -c "SELECT COUNT(*) FROM colaborador;" | xargs)

  if [ "$COLAB_COUNT" -eq 0 ]; then
    echo "🌱 Executando seeders..."
    yarn seed
  else
    echo "✅ Seeders já rodaram. Tabela 'colaborador' tem $COLAB_COUNT registros."
  fi
else
  echo "❌ Erro ao executar migrations. Abortando..."
  exit 1
fi

echo "✅ Iniciando aplicação..."
node dist/main.js
