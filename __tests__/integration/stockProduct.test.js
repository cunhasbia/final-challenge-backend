import request from 'supertest';
import app from '../../src/app';

describe('stockProduct', () => {
  describe('store', () => {
    it('should add/create a quantity of products in a specific stock', async () => {
      expect.assertions(3);

      const category = await request(app).post('/category').send({
        name: 'Home',
      });
      const product = await request(app).post('/product').send({
        name: 'Book - Recipes 2021',
        price: 25,
        category_id: category.body.id,
      });
      const stock = await request(app).post('/stock').send({
        name: 'MG',
      });

      const response = await request(app).post('/stock-product').send({
        quantity: 10,
        product_id: product.body.id,
        stock_id: stock.body.id,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('quantity');
    });
    it('should not be able to add products in stock', async () => {
      expect.assertions(1);

      const response = await request(app).post('/stock-product').send({
        quantity: 10,
        product_id: null,
        stock_id: null,
      });

      expect(response.status).toBe(400);
    });
  });

  describe('index', () => {
    it('should list all products in all existing stocks', async () => {
      expect.assertions(1);

      const response = await request(app).get(
        '/stock-product?limit=100&page=1'
      );

      expect(response.status).toBe(200);
    });
    it('should not be able to list all products when sending invalid data as pagination', async () => {
      expect.assertions(1);

      const response = await request(app).get('/stock-product?limit=a&page=b');

      expect(response.status).toBe(400);
    });
  });

  describe('show', () => {
    it('should show a stock of products when sending id as parameter', async () => {
      expect.assertions(2);

      const response = await request(app).get('/stock-product/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
    it('should not be able to show a stock of products when sending string as id parameter', async () => {
      expect.assertions(1);

      const response = await request(app).get('/stock-product/a');

      expect(response.status).toBe(400);
    });
  });

  describe('update', () => {
    it('should be able to update a stock product', async () => {
      expect.assertions(2);

      const response = await request(app).put('/stock-product/1').send({
        quantity: 8,
        product_id: 1,
        stock_id: 1,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
    it('should not be able to update a stock product when sending a string as id parameter', async () => {
      expect.assertions(1);

      const response = await request(app).put('/stock-product/a').send({
        quantity: 8,
        product_id: 1,
        stock_id: 1,
      });

      expect(response.status).toBe(404);
    });
    it('should not be able to update a stock product when sending a invalid data to update', async () => {
      expect.assertions(1);

      const response = await request(app).put('/stock-product/1').send({
        quantity: '',
        product_id: null,
        stock_id: null,
      });

      expect(response.status).toBe(400);
    });
  });

  describe('delete', () => {
    it('should be able to delete a stock product', async () => {
      expect.assertions(1);

      const response = await request(app).delete('/stock-product/1');

      expect(response.status).toBe(204);
    });
  });
});
