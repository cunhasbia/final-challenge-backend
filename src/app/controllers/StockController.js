import Stock from '../models/Stock';

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
}

export default new StockController();
