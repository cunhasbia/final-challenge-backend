import request from 'supertest';
import app from '../../src/app';

describe('reason', () => {
  describe('index()', () => {
    it('should list all return reasons', async () => {
      expect.assertions(3);

      const response = await request(app).get('/reason');

      expect(response.status).toBe(200);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('description');
    });
  });
});
