import request from 'supertest';
import app from '../../src/app';

describe('product', () => {
  describe('store', () => {
    it('should be able to create a new product', async () => {
      expect.assertions(2);

      const category = await request(app).post('/category').send({
        name: 'Tech',
      });
      const response = await request(app).post('/product').send({
        name: 'Book10',
        price: 40,
        category_id: category.body.id,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
    it('should not be able to create a new product when sending a invalid data', async () => {
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
    it('should be able to filter a product by name', async () => {
      expect.assertions(1);

      const response = await request(app).get(
        '/product?limit=100&page=1&name=Book10'
      );

      expect(response.status).toBe(200);
    });
    it('should not be able to list all products when sending invalid data as pagination', async () => {
      expect.assertions(1);

      const response = await request(app).get('/product?limit=a&page=b');

      expect(response.status).toBe(400);
    });
  });

  describe('show', () => {
    it('should show a product when sending id as parameter', async () => {
      expect.assertions(2);

      const response = await request(app).get('/product/1?limit=100&page=1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
    it('should not be able to show a product when sending a string as id parameter', async () => {
      expect.assertions(1);

      const response = await request(app).get('/product/a?limit=100&page=1');

      expect(response.status).toBe(400);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      expect.assertions(3);

      const response = await request(app).put('/product/1').send({
        name: 'Updated',
        price: 20,
        category_id: 1,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name');
    });
    it('should not update a product when sending a string as id parameter', async () => {
      expect.assertions(1);

      const response = await request(app).put('/product/a').send({
        name: 'Updated',
        price: 20,
        category_id: 1,
      });

      expect(response.status).toBe(400);
    });
    it('should not update a product when sending a invalid data to update', async () => {
      expect.assertions(1);

      const response = await request(app).put('/product/1').send({
        name: '',
        price: '',
        category_id: null,
      });

      expect(response.status).toBe(400);
    });
  });

  describe('delete', () => {
    it('should be able to delete a product', async () => {
      expect.assertions(1);

      const response = await request(app).delete('/product/1');

      expect(response.status).toBe(204);
    });
  });
});
