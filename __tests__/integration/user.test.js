import request from 'supertest';
import app from '../../src/app';

describe('user', () => {
  describe('create', () => {
    it('should create a new user', async () => {
      expect.assertions(2);

      const response = await request(app).post('/user').send({
        name: 'Vinicius',
        email: 'vini@email.com',
        password: '12345',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });

    it('should return 400 when...', async () => {
      expect.assertions(1);

      const response = await request(app).post('/user').send({
        name: 'Vinicius',
        password: '12345',
      });

      expect(response.status).toBe(400);
    });

    it('should create a new when send a password as number...', async () => {
      expect.assertions(1);

      const response = await request(app).post('/user').send({
        name: 'Vinicius',
        email: 'vini@email.com',
        password: 12345,
      });

      expect(response.status).toBe(200);
    });
  });
});
