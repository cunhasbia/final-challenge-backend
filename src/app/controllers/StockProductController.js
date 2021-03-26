/* eslint-disable radix */
/* eslint-disable camelcase */
import StockProduct from '../models/StockProduct';
import Stock from '../models/Stock';
import Product from '../models/Product';

class StockProductController {
  async index(request, response) {
    try {
      const stockProduct = await StockProduct.findAll({
        attributes: ['id'],

        include: [
          { model: Product, as: 'products', attributes: ['name'] },
          { model: Stock, as: 'stock', attributes: ['name'] },
        ],
      });

      return response.json(stockProduct);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }
  // async show(request, response) {}
  // async store(request, response) {}
  // async update(request, response) {}
  // async delete(request, response) {}
}

export default new StockProductController();
