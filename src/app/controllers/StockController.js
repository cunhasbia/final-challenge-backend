/* eslint-disable radix */
/* eslint-disable no-unused-vars */

import Stock from '../models/Stock';
import Product from '../models/Product';
import StockProduct from '../models/StockProduct';

class StockController {
  async index(request, response) {
    try {
      const stocks = await Stock.findAndCountAll({
        attributes: ['id', 'name'],
      });

      return response.json(stocks);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const checkStock = await Stock.findByPk(id);

      if (!checkStock) {
        return response.status(404).json({ message: 'Stock not found' });
      }

      const stock = await StockProduct.findAll({
        where: {
          stock_id: Number.parseInt(id),
        },
        attributes: ['id', 'quantity'],
        include: [
          {
            model: Stock,
            as: 'stock',
            attributes: ['name'],
          },
          {
            model: Product,
            as: 'product',
            attributes: ['name', 'total'],
          },
        ],
      });

      return response.json(stock);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async store(request, response) {
    try {
      const { name } = request.body;

      if (!name) {
        return response.status(400).json({ message: 'Invalid data' });
      }

      const stock = await Stock.create({ name });

      return response.json(stock);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }
}

export default new StockController();
