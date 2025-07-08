import express from 'express';
import colaboradorRoute from '../routes/colaborador.route';
import pontoRoute from '../routes/ponto.route';

const app = express();

app.use(express.json());

// [joaovictor - 07/07/2025] Rotas principais
app.use('/colaborador', colaboradorRoute);
app.use('/ponto', pontoRoute);

export default app;
