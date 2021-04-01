/* eslint-disable radix */
/* eslint-disable no-unused-vars */
import Stock from '../models/Stock';
import Product from '../models/Product';
import Category from '../models/Category';
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

      const parsed = Number.parseInt(id);

      const stock = await Stock.findByPk(parsed, {
        attributes: ['id', 'name'],
        include: [
          {
            model: StockProduct,
            as: 'stock',
            attributes: ['id'],
            required: true,
          },

          // { model: Product, as: 'products', attributes: ['id'] },
        ],
        // include: [
        //   {
        //     model: Product,
        //     as: 'product',
        //     attributes: ['name'],
        //   },
        // ],
      });

      // const stock = await Stock.findByPk(parsed, {
      //   attributes: ['id', 'name'],
      //   include: [
      //     {
      //       model: Product,
      //       as: 'products',
      //       attributes: ['name'],
      //     },
      //   ],
      //   where,
      //   limit,
      //   offset: limit * (page - 1),
      // });

      if (!stock) {
        return response.status(404).json({ message: 'Stock not found' });
      }

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
