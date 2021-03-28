import request from 'supertest';
import app from '../../src/app';

describe('reason', () => {
  describe('store', () => {
    it('should create a return reason in database', async () => {
      expect.assertions(2);

      const response = await request(app).post('/reason').send({
        description: 'Creating a return reason...',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
    it('should return a error when send a invalid data to create a return reason', async () => {
      expect.assertions(1);

      const response = await request(app).post('/reason').send({
        description: '',
      });

      expect(response.status).toBe(404);
    });
  });

  describe('index', () => {
    it('should list all return reasons', async () => {
      expect.assertions(1);

      const response = await request(app).get('/reason?limit=100&page=1');

      expect(response.status).toBe(200);
    });
  });

  describe('show', () => {
    it('should show a return reason by id passed as parameter', async () => {
      expect.assertions(2);

      const response = await request(app).get('/reason/1?limit=100&page=1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
    it('should return a error when sending a invalid data as id param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/reason/a?limit=100&page=1');

      expect(response.status).toBe(400);
    });
  });
});
