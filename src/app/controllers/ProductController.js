/* eslint-disable radix */
/* eslint-disable camelcase */
import Product from '../models/Product';
import Category from '../models/Category';

class ProductController {
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

      const products = await Product.findAndCountAll({
        attributes: ['id', 'name', 'price'],
        where,
        limit,
        offset: limit * (page - 1),
      });

      return response.json(products);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const parsed = Number.parseInt(id);

      if (Number.isNaN(parsed)) {
        return response.status(400).json({ message: 'Invalid ID' });
      }

      const product = await Product.findOne({
        where: { id },
        attributes: ['id', 'name', 'price'],
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['id', 'name'],
          },
        ],
      });

      if (!product) {
        return response.status(404).json({ message: 'Product not found' });
      }

      return response.json(product);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async store(request, response) {
    try {
      const { name, price, category_id } = request.body;
      const total = 0;

      if (!name || !price || !category_id) {
        return response.status(400).json({ message: 'Invalid data' });
      }

      const parsed = Number.parseInt(category_id);

      if (Number.isNaN(parsed)) {
        return response.status(400).json({ message: 'Invalid ID' });
      }

      const category = await Category.findByPk(category_id);

      if (!category) {
        return response.status(404).json({ message: 'Category not found' });
      }

<<<<<<< HEAD
      const product = await Product.create({
        name,
        price,
        category_id,
        total,
      });
=======
      const product = await Product.create({ name, price, category_id, total });
>>>>>>> e38cd7d2f59a128c0b77e1dcb3cd1e4964b8b4f8

      return response.json(product);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { name, price, category_id } = request.body;
      const parsed = Number.parseInt(id);

      if ((!name || !price, !category_id)) {
        return response.status(400).json({
          message: 'Invalid data',
        });
      }

      if (Number.isNaN(parsed)) {
        return response.status(400).json({ message: 'Invalid ID' });
      }

      const product = await Product.findByPk(parsed);

      if (!product) {
        return response.status(404).json({
          message: 'Product not found',
        });
      }

      product.name = name;
      product.price = price;
      product.category_id = category_id;
      product.save();

      return response.json(product);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const parsed = Number.parseInt(id);

      if (Number.isNaN(parsed)) {
        return response.status(400).json({ message: 'Invalid ID' });
      }

      const product = await Product.findByPk(parsed);

      if (!product) {
        return response.status(404).json({
          message: 'Product not found',
        });
      }

      product.destroy();
      return response.sendStatus(202);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }
}

export default new ProductController();
