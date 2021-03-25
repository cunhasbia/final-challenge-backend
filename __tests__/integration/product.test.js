import request from 'supertest';
import app from '../../src/app';

describe('product', () => {
  describe('store()', () => {
    it('should create a new product and store it in the database', async () => {
      expect.assertions(3);

      const response = await request(app).post('/product').send({
        name: 'Romance',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toBe('number');
    });
  });

  describe('index()', () => {
    it('should list all products', async () => {
      expect.assertions(3);

      const response = await request(app).get('/product');

      expect(response.status).toBe(200);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
    });
  });

  describe('show()', () => {
    it('should list a product with the id passed as parameter', async () => {
      expect.assertions(3);

      const response = await request(app).get('/product/1');

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Romance');
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('update()', () => {
    it('should update a product', async () => {
      expect.assertions(3);

      const response = await request(app).update('/product/1').send({
        name: 'Science fiction',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Science fiction');
    });
  });

  describe('delete()', () => {
    it('should delete a product from the database', async () => {
      expect.assertions(1);

      const response = await request(app).delete('/product/1');

      expect(response.status).toBe(202);
    });
  });
});
