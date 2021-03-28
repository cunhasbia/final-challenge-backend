/* eslint-disable radix */
/* eslint-disable no-unused-vars */
import Reason from '../models/Reason';
import SaleReturn from '../models/SaleReturn';
import Product from '../models/Product';
import Category from '../models/Category';

class ReasonController {
  async index(request, response) {
    try {
      const { page, limit, description } = request.query;
      const where = {};

      if (description) {
        where.description = description;
      }

      const reason = await Reason.findAndCountAll({
        attributes: ['id', 'description'],
        where,
        limit,
        offset: limit * (page - 1),
      });

      return response.json(reason);
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

      const reason = await Reason.findByPk(parsed, {
        attributes: ['id', 'description'],
        include: [
          {
            model: SaleReturn,
            as: 'sale_return',
            attributes: ['quantity'],
          },
          {
            model: Product,
            as: 'product',
            attributes: ['name'],
          },
          {
            model: Category,
            as: 'category',
            attributes: ['name'],
          },
        ],
        where,
        limit,
        offset: limit * (page - 1),
      });

      if (!reason) {
        return response.status(404).json({ message: 'Category not found' });
      }

      return response.json(reason);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async store(request, response) {
    try {
      const { description } = request.body;

      if (!description) {
        return response.status(404).json({ message: 'Invalid data' });
      }

      const reason = await Reason.create({ description });

      return response.json(reason);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }
}

export default new ReasonController();