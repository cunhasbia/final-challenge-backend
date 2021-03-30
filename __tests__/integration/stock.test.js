import request from 'supertest';
import app from '../../src/app';

describe('stock', () => {
  describe('store', () => {
    it('should create a stock (region)', async () => {
      expect.assertions(2);

      const response = await request(app).post('/stock').send({
        name: 'SP',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('index', () => {
    it('should list all existing stocks', async () => {
      expect.assertions(1);

      const response = await request(app).get('/stock');

      expect(response.status).toBe(200);
    });
  });

  /* describe('show', () => {
    it('should show a stock when sending id as param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/stock/1');

      expect(response.status).toBe(200);
    });
    it('should return a error when sending a invalid data as id param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/stock/a');

      expect(response.status).toBe(400);
    });
  }); */
});
