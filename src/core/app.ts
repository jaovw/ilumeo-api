import express from 'express';
import sequelize from '../config/database';

const app = express();

app.use(express.json());

// [joaovictor - 07/07/2025] Testa a conexão com o banco no boot
(async () => {
  try {
    await sequelize.authenticate();
    // console.log('Database connected!');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
})();

export default app;
