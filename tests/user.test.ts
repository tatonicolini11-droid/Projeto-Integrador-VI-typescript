import request from 'supertest';
import { app } from '../src/app';
import { sequelize } from '../src/configuracao/database';
import { User } from '../src/modelos/User';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
  await User.destroy({ truncate: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('CRUD de Usuários', () => {
  it('cria um usuário', async () => {
    const res = await request(app).post('/api/users').send({ nome: 'Ana', email: 'ana@x.com' });
    expect(res.status).toBe(201);
    expect(res.body.nome).toBe('Ana');
  });

  it('rejeita criação sem email', async () => {
    const res = await request(app).post('/api/users').send({ nome: 'Ana' });
    expect(res.status).toBe(400);
  });

  it('rejeita criação sem corpo', async () => {
    const res = await request(app).post('/api/users');
    expect(res.status).toBe(400);
  });

  it('lista usuários', async () => {
    await User.create({ nome: 'Ana', email: 'a@x.com' });
    await User.create({ nome: 'Bia', email: 'b@x.com' });
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it('busca usuário por id', async () => {
    const u = await User.create({ nome: 'Ana', email: 'a@x.com' });
    const res = await request(app).get(`/api/users/${u.id}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe('a@x.com');
  });

  it('retorna 404 ao buscar id inexistente', async () => {
    const res = await request(app).get('/api/users/999');
    expect(res.status).toBe(404);
  });

  it('atualiza usuário', async () => {
    const u = await User.create({ nome: 'Ana', email: 'a@x.com' });
    const res = await request(app).put(`/api/users/${u.id}`).send({ nome: 'Ana Maria' });
    expect(res.status).toBe(200);
    expect(res.body.nome).toBe('Ana Maria');
  });

  it('retorna 404 ao atualizar id inexistente', async () => {
    const res = await request(app).put('/api/users/999').send({ nome: 'X' });
    expect(res.status).toBe(404);
  });

  it('remove usuário', async () => {
    const u = await User.create({ nome: 'Ana', email: 'a@x.com' });
    const res = await request(app).delete(`/api/users/${u.id}`);
    expect(res.status).toBe(204);
    expect(await User.findByPk(u.id)).toBeNull();
  });

  it('retorna 404 ao remover id inexistente', async () => {
    const res = await request(app).delete('/api/users/999');
    expect(res.status).toBe(404);
  });
});
