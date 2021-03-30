import request from 'supertest';
import app from '../../src/app';

describe('saleReturn', () => {
  describe('store', () => {
    it('should be able to create a new sale return', async () => {
      expect.assertions(1);

      const category = await request(app).post('/category').send({
        name: 'History',
      });
      const product = await request(app).post('/product').send({
        name: 'Product test',
        price: 20,
        category_id: category.body.id,
      });
      const stock = await request(app).post('/stock').send({
        name: 'SC',
      });
      const stockProduct = await request(app).post('/stock-product').send({
        quantity: 100,
        product_id: product.body.id,
        stock_id: stock.body.id,
      });
      const sale = await request(app).post('/sale').send({
        quantity: 20,
        product_id: product.body.id,
        stock_id: stockProduct.body.stock_id,
      });
      const reason = await request(app).post('/reason').send({
        description: 'Testing...',
      });
      const response = await request(app).post('/sale-return').send({
        quantity: 20,
        reason_id: reason.body.id,
        sale_id: sale.body.id,
      });

      expect(response.status).toBe(200);
    });
    it('should not be able to create a new sale return', async () => {
      expect.assertions(1);

      const response = await request(app).post('/sale-return').send({
        quantity: '',
        reason_id: '',
        sale_id: '',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('index', () => {
    it('should list all return reasons, filtering by category or product', async () => {
      expect.assertions(1);

      const response = await request(app).get('/sale-return?type=category');

      expect(response.status).toBe(200);
    });
    it('should not be able to list all return reasons', async () => {
      expect.assertions(1);

      const response = await request(app).get('/sale-return');

      expect(response.status).toBe(400);
    });
  });

  describe('show', () => {
    it('should show a specific sale return when send id as route param', async () => {
      expect.assertions(2);

      const response = await request(app).get('/sale-return/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
    it('should not be able to show a sale return when send invalid data as id param', async () => {
      expect.assertions(1);

      const response = await request(app).get('/sale-return/a');

      expect(response.status).toBe(400);
    });
  });
});
