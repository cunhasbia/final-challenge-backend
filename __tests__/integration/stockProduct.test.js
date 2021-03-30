import request from 'supertest';
import app from '../../src/app';

describe('stockProduct', () => {
  describe('store', () => {
    it('should add a quantity of products in a specific stock', async () => {
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
  });

  describe('index', () => {
    it('should list all products in all existing stocks', async () => {
      expect.assertions(1);

      const response = await request(app).get(
        '/stock-product?limit=100&page=1'
      );

      expect(response.status).toBe(200);
    });
  });

  describe('show', () => {
    it('should show a stock of products when send id as route param', async () => {
      expect.assertions(2);

      const response = await request(app).get('/stock-product/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
    it('should return a error when sending a invalid data as id param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/stock-product/a');

      expect(response.status).toBe(400);
    });
  });

  describe('update', () => {
    it('should update a quantity of product in stock', async () => {
      expect.assertions(2);

      const response = await request(app).put('/stock-product/1').send({
        quantity: 8,
        product_id: 1,
        stock_id: 1,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
    it('should return a error when sending a invalid data as id param', async () => {
      expect.assertions(1);

      const response = await request(app).put('/stock-product/a').send({
        quantity: 8,
        product_id: 1,
        stock_id: 1,
      });

      expect(response.status).toBe(400);
    });

    it('should return a error when sending a invalid data to update the stock products', async () => {
      expect.assertions(1);

      const response = await request(app).put('/stock-product/1').send({
        quantity: '',
        product_id: '',
        stock_id: '',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('delete', () => {
    it('should delete a stock products when sending id as route param', async () => {
      expect.assertions(1);

      const response = await request(app).delete('/stock-product/1');

      expect(response.status).toBe(202);
    });
  });
});
