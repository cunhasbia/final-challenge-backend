/* eslint-disable radix */
/* eslint-disable no-unused-vars */
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
      const parsed = Number.parseInt(id);

      const category = await Category.findByPk(parsed, {
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
}

export default new CategoryController();
