/* eslint-disable radix */
/* eslint-disable camelcase */
import Stock from '../models/Stock';

class StockController {
  async index(request, response) {
    try {
      const stocks = await Stock.findAll();

      return response.json(stocks);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async store(request, response) {
    try {
      const { quantity, product_id } = request.body;

      if (!quantity || !product_id) {
        return response.status(400).json({ message: 'Invalid data' });
      }

      const stock = await Stock.create({ quantity, product_id });

      return response.json(stock);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }
}

export default new StockController();
