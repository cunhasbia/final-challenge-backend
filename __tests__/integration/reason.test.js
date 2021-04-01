import request from 'supertest';
import app from '../../src/app';

describe('reason', () => {
  describe('store', () => {
    it('should be able to create a return reason', async () => {
      expect.assertions(2);

      const response = await request(app).post('/reason').send({
        description: 'Creating a return reason...',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
    it('should not be able to create a return reason', async () => {
      expect.assertions(1);

      const response = await request(app).post('/reason').send({
        description: '',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('index', () => {
    it('should list all return reasons', async () => {
      expect.assertions(1);

      const response = await request(app).get('/reason?limit=100&page=1');

      expect(response.status).toBe(200);
    });
    it('should not be able to list all return reasons when sending invalid data as pagination', async () => {
      expect.assertions(1);

      const response = await request(app).get('/reason?limit=a&page=a');

      expect(response.status).toBe(400);
    });
  });

  describe('show', () => {
    it('should show a return reason when sending id as parameter', async () => {
      expect.assertions(2);

      const response = await request(app).get('/reason/1?limit=100&page=1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
    it('should not be able to show a return reason when sending a string as id param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/reason/a?limit=100&page=1');

      expect(response.status).toBe(400);
    });
  });
});
