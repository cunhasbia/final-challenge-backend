import request from 'supertest';
import app from '../../src/app';

describe('stock', () => {
  describe('store', () => {
    it('should be able to create a stock (region)', async () => {
      expect.assertions(2);

      const response = await request(app).post('/stock').send({
        name: 'SP',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
    it('should not be able to create a stock when sending a invalid data', async () => {
      expect.assertions(1);

      const response = await request(app).post('/stock').send({
        name: '',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('index', () => {
    it('should list all stocks', async () => {
      expect.assertions(1);

      const response = await request(app).get('/stock');

      expect(response.status).toBe(200);
    });
  });

  // eslint-disable-next-line jest/no-commented-out-tests
  /* describe('show', () => {
    it('should show a stock when sending id as parameter', async () => {
      expect.assertions(1);

      const response = await request(app).get('/stock/1');

      expect(response.status).toBe(200);
    });
    it('should not be able to show a stock when sending a string as id parameter', async () => {
      expect.assertions(1);

      const response = await request(app).get('/stock/a');

      expect(response.status).toBe(400);
    });
  }); */
});
