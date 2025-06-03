import request from 'supertest';
import { disconnectDB } from '../config/db';
import { Plan } from '../models/Plan';
import { User } from '../models/User';
import app from '../serverForTest';

beforeAll(async () => {
  if (app.ready) await app.ready;
});

describe('Auth API', () => {
  afterAll(async () => {
    await disconnectDB();
  });

  it('registers and logs user', async () => {
    const registerRes = await request(app).post('/api/auth/register').send({
      email: 'test@example.com',
      password: 'pass1234',
      firstName: 'Test',
      lastName: 'User',
    });
    expect(registerRes.status).toBe(200);
    expect(registerRes.body.token).toBeDefined();

    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'pass1234',
    });
    expect(loginRes.status).toBe(200);
    expect(loginRes.body.token).toBeDefined();
  });
});
