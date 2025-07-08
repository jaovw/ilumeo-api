import 'dotenv/config';

import app from './core/app';
import sequelize from './config/database';

const PORT = process.env.PORT;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('🗄️  Conectado ao banco com sucesso');

    await sequelize.sync({ alter: true }); // ← cria tabelas se não existirem (dev only)
    console.log('🧱  Tabelas sincronizadas com sucesso');

    app.listen(PORT, () => {
      console.log(`🚀  Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Erro ao iniciar aplicação:', err);
  }
}

start();
