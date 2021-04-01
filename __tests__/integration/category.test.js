import request from 'supertest';
import app from '../../src/app';

describe('category', () => {
  describe('store', () => {
    it('should be able to create a new category', async () => {
      expect.assertions(2);

      const response = await request(app).post('/category').send({
        name: 'Science',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
    it('should not be able to create a new category when sending invalid data', async () => {
      expect.assertions(1);

      const response = await request(app).post('/category').send({
        name: '',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('index', () => {
    it('should list all categories', async () => {
      expect.assertions(2);

      const response = await request(app).get('/category?limit=100&page=1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('count');
    });
    it('should be able to filter a category by name', async () => {
      expect.assertions(1);

      const response = await request(app).get(
        '/category?limit=100&page=1&name=Science'
      );

      expect(response.status).toBe(200);
    });
    it('should not be able to list all categories when sending invalid data as pagination', async () => {
      expect.assertions(1);

      const response = await request(app).get('/category?limit=a&page=b');

      expect(response.status).toBe(400);
    });
  });

  describe('show', () => {
    it('should show a category when sending id as parameter', async () => {
      expect.assertions(2);

      const response = await request(app).get('/category/1?limit=100&page=1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
    it('should not be able to show a category when sending a string as id parameter', async () => {
      expect.assertions(1);

      const response = await request(app).get('/category/a?limit=100&page=1');

      expect(response.status).toBe(400);
    });
  });
});
