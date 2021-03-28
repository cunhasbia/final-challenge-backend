import request from 'supertest';
import app from '../../src/app';

describe('product', () => {
  describe('store', () => {
    it('should create a new product', async () => {
      expect.assertions(2);

      const response = await request(app).post('/product').send({
        name: 'Book - Advanced Javascript',
        price: 55,
        category_id: 1,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
    it('should return a error when send a invalid data to create a product', async () => {
      expect.assertions(1);

      const response = await request(app).post('/product').send({
        name: '',
        price: '',
        category_id: '',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('index', () => {
    it('should list all products', async () => {
      expect.assertions(2);

      const response = await request(app).get('/product?limit=100&page=1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('count');
    });
    it('should return a error when send invalid data as pagination', async () => {
      expect.assertions(1);

      const response = await request(app).get('/product?limit=a&page=b');

      expect(response.status).toBe(400);
    });
    it('should filter a product by name', async () => {
      expect.assertions(2);

      const response = await request(app).get(
        '/product?limit=100&page=1&name=Livro%01'
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('count');
    });
  });

  describe('show', () => {
    it('should show a product with the id passed as parameter', async () => {
      expect.assertions(2);

      const response = await request(app).get('/product/1?limit=100&page=1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
    it('should return a error when sending a invalid data as id param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/product/a?limit=100&page=1');

      expect(response.status).toBe(400);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      expect.assertions(3);

      const response = await request(app).put('/product/1').send({
        name: 'Updated book',
        price: 20,
        category_id: 1,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name');
    });
    it('should return a error when sending a invalid data as id param', async () => {
      expect.assertions(1);

      const response = await request(app).put('/product/a').send({
        name: 'Test',
        price: 22,
        category_id: 1,
      });

      expect(response.status).toBe(400);
    });

    it('should return a error when sending a invalid data to update the product', async () => {
      expect.assertions(1);

      const response = await request(app).put('/product/2').send({
        name: '',
        price: null,
        category_id: null,
      });

      expect(response.status).toBe(400);
    });
  });

  describe('delete', () => {
    it('should delete a product from the database', async () => {
      expect.assertions(1);

      const response = await request(app).delete('/product/1');

      expect(response.status).toBe(202);
    });
  });
});
