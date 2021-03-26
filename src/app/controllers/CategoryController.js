/* eslint-disable radix */
/* eslint-disable no-unused-vars */
import Category from '../models/Category';
import Product from '../models/Product';

class CategoryController {
  async index(request, response) {
    try {
      const { page, limit, name } = request.query;
      const where = {};

      if (!page || !limit) {
        return response.status(400).json({ message: 'Invalid params' });
      }

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
}

export default new CategoryController();
