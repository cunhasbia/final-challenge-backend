import request from 'supertest';
import app from '../../src/app';

describe('sale', () => {
  describe('store', () => {
    it('should be able to create a new sale', async () => {
      expect.assertions(3);

      const category = await request(app).post('/category').send({
        name: 'Fantasy',
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
    it('should not be able to create a new sale when sending invalid data', async () => {
      expect.assertions(1);

      const response = await request(app).post('/sale').send({
        quantity: '',
        product_id: '',
        stock_id: '',
      });

      expect(response.status).toBe(400);
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
    it('should show a specific sale when sending id as parameter', async () => {
      expect.assertions(3);

      const response = await request(app).get('/sale/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('quantity');
    });
    it('should not be able to show a sale when sending a string as id parameter', async () => {
      expect.assertions(1);

      const response = await request(app).get('/sale/a');

      expect(response.status).toBe(400);
    });
  });
});
