import request from 'supertest';
import app from '../../src/app';

describe('sale', () => {
  describe('store', () => {
    it('should create a new sale', async () => {
      expect.assertions(3);

      const category = await request(app).post('/category').send({
        name: 'Fiction',
      });

      const product = await request(app).post('/product').send({
        name: 'Book - The Lord of the Rings',
        price: 45,
        category_id: category.body.id,
      });

      const stock = await request(app).post('/stock').send({
        name: 'RS',
      });

      const stockProduct = await request(app).post('/stock-product').send({
        quantity: 100,
        product_id: product.body.id,
        stock_id: stock.body.id,
      });

      const response = await request(app).post('/sale').send({
        quantity: 20,
        product_id: product.body.id,
        stock_id: stockProduct.body.stock_id,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('quantity');
    });
  });

  describe('index', () => {
    it('should list all sales', async () => {
      expect.assertions(1);

      const response = await request(app).get('/sale');

      expect(response.status).toBe(200);
    });
  });

  describe('show', () => {
    it('should show a specific sale when send id as route param', async () => {
      expect.assertions(3);

      const response = await request(app).get('/sale/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('quantity');
    });
    it('should return a error when sending a invalid data as id param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/sale/a');

      expect(response.status).toBe(400);
    });
  });
});
