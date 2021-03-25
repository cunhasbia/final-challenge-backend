import request from 'supertest';
import app from '../../src/app';

describe('category', () => {
  describe('index()', () => {
    it('should list all categories', async () => {
      expect.assertions(2);

      const response = await request(app).get('/category');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
  });
});
