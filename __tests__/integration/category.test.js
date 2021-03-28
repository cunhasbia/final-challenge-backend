import request from 'supertest';
import app from '../../src/app';

describe('category', () => {
  describe('store', () => {
    it('should create a new category', async () => {
      expect.assertions(2);

      const response = await request(app)
        .post('/category')
        .send({ name: 'Recipes' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
    it('should return a error when send a invalid data', async () => {
      expect.assertions(1);

      const response = await request(app).post('/category').send({
        name: '',
      });

      expect(response.status).toBe(404);
    });
  });

  describe('index', () => {
    it('should list all categories', async () => {
      expect.assertions(2);

      const response = await request(app).get('/category?limit=100&page=1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('count');
    });
    it('should return a error when send invalid data as pagination', async () => {
      expect.assertions(1);

      const response = await request(app).get('/category?limit=a&page=b');

      expect(response.status).toBe(400);
    });
    it('should filter a category by name', async () => {
      expect.assertions(2);

      const response = await request(app).get(
        '/category?limit=100&page=1&name=Technology'
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('count');
    });
  });

  describe('show', () => {
    it('should show a category with the id passed as parameter', async () => {
      expect.assertions(2);

      const response = await request(app).get('/category/1?limit=100&page=1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
    it('should return a error when sending a string as id param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/category/a?limit=100&page=1');

      expect(response.status).toBe(400);
    });
  });
});