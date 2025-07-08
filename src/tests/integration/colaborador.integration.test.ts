import sequelize from '../../config/database';
import request from 'supertest';
import app from '../../core/app';

describe('GET /colaborador', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });

    await sequelize.models.Colaborador.create({ nome: 'supertest', matricula: 123 });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('Retornar 200 com lista de colaboradores', async () => {
    const res = await request(app).get('/colaborador');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('nome', 'supertest');
  });
});
