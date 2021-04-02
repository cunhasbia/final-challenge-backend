/* eslint-disable radix */

import Category from '../models/Category';
import Product from '../models/Product';

class CategoryController {
  async index(request, response) {
    try {
      const { page, limit, name } = request.query;
      const where = {};

      if (name) {
        where.name = name;
      }

      const categories = await Category.findAndCountAll({
        attributes: ['id', 'name'],
        where,
        limit,
        offset: limit * (page - 1),
      });

      return response.json(categories);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;
      const { page, limit } = request.query;

      const category = await Category.findByPk(Number.parseInt(id), {
        attributes: ['id', 'name'],
        include: [
          {
            model: Product,
            as: 'products',
            attributes: ['id', 'name'],
          },
        ],
        limit,
        offset: limit * (page - 1),
      });

      if (!category) {
        return response.status(404).json({ message: 'Category not found' });
      }

      return response.json(category);
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

      const category = await Category.create({ name });

      return response.json(category);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }
}

export default new CategoryController();
