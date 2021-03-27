/* eslint-disable radix */
/* eslint-disable no-unused-vars */
import Stock from '../models/Stock';
import Product from '../models/Product';

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
      const { page, limit } = request.query;
      const where = {};
      const parsed = Number.parseInt(id);

      if (!page || !limit) {
        return response.status(400).json({ message: 'Invalid params' });
      }

      if (Number.isNaN(parsed)) {
        return response.status(400).json({ message: 'Invalid ID' });
      }

      const stock = await Stock.findByPk(parsed, {
        attributes: ['id', 'name'],
        // include: [
        //   {
        //     model: Product,
        //     as: 'product',
        //     attributes: ['name'],
        //   },
        // ],
        where,
        limit,
        offset: limit * (page - 1),
      });

      if (!stock) {
        return response.status(404).json({ message: 'Stock not found' });
      }

      return response.json(stock);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }
}

export default new StockController();
