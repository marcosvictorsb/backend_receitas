#!/bin/sh
set -e
 
LOCK_FILE="/app/.setup-done"
 
if [ ! -f "$LOCK_FILE" ]; then
  echo "Primeira inicialização — rodando setup..."
 
  echo "Aguardando o banco de dados ficar pronto..."
  until npx sequelize-cli db:migrate:status > /dev/null 2>&1; do
    sleep 2
  done
 
  echo "Criando banco de dados (se não existir)..."
  npx sequelize-cli db:create --env development || true
 
  echo "Rodando migrations..."
  npx sequelize-cli db:migrate

  echo "Rodando seeders..."
  npx sequelize-cli db:seed:all
 
  echo "Setup concluído."
  touch "$LOCK_FILE"
else
  echo "Setup já realizado anteriormente. Pulando..."
fi
 
exec "$@"