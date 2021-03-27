/* eslint-disable radix */
/* eslint-disable camelcase */
import StockProduct from '../models/StockProduct';
import Stock from '../models/Stock';
import Product from '../models/Product';

class StockProductController {
  async index(request, response) {
    try {
      const { page, limit } = request.query;

      const stockProduct = await StockProduct.findAll({
        attributes: ['id', 'quantity'],
        include: [
          { model: Product, as: 'products', attributes: ['id', 'name'] },
          { model: Stock, as: 'stock', attributes: ['name'] },
        ],
        limit,
        offset: limit * (page - 1),
      });

      return response.json(stockProduct);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const stockProduct = await StockProduct.findOne({
        where: { id },
        attributes: ['id', 'quantity'],
        include: [
          { model: Product, as: 'products', attributes: ['name'] },
          { model: Stock, as: 'stock', attributes: ['name'] },
        ],
      });

      if (!stockProduct) {
        return response.status(404).json({ message: 'Stock not found' });
      }

      return response.json(stockProduct);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async store(request, response) {
    try {
      const { quantity, product_id, stock_id } = request.body;

      const parsedProduct = Number.parseInt(product_id);
      const parsedStock = Number.parseInt(stock_id);

      const product = await Product.findByPk(parsedProduct);

      if (!product) {
        return response.status(404).json({ message: 'Product not found' });
      }

      const stock = await Stock.findByPk(parsedStock);

      if (!stock) {
        return response.status(404).json({ message: 'Stock not found' });
      }

      // faz a soma e inclui na tabela produtos
      const quantityTotal = product.total;
      product.total = quantityTotal + quantity;
      product.save();

      const stockProduct = await StockProduct.create({
        quantity,
        product_id,
        stock_id,
      });

      return response.json({ stockProduct });
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async update(request, response) {
    try {
      const { quantity, product_id, stock_id } = request.body;

      const parsedProduct = Number.parseInt(product_id);
      const parsedStock = Number.parseInt(stock_id);

      const stockProduct = await StockProduct.findByPk(parsedProduct);

      if (!stockProduct) {
        return response.status(404).json({
          message: 'Product stock not found',
        });
      }

      const product = await Product.findByPk(stockProduct.product_id);

      if (!product) {
        return response.status(404).json({ message: 'Product not found' });
      }

      const stock = await Stock.findByPk(parsedStock);

      if (!stock) {
        return response.status(404).json({ message: 'Stock not found' });
      }

      // faz a soma e inclui na tabela produtos
      const quantityTotal = product.total;
      product.total = quantityTotal - stockProduct.quantity + quantity;
      product.save();

      stockProduct.stock_id = parsedStock;
      stockProduct.quantity = quantity;
      stockProduct.save();

      return response.json(product);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const parsedId = Number.parseInt(id);

      const stockProduct = await StockProduct.findByPk(parsedId);

      if (!stockProduct) {
        return response.status(404).json({
          message: 'Product stock not found',
        });
      }
      const product = await Product.findByPk(stockProduct.product_id);

      // subtrai e inclui na tabela produtos
      const quantityTotal = product.total;
      product.total = quantityTotal - stockProduct.quantity;
      product.save();

      stockProduct.destroy();

      return response.sendStatus(202);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }
}

export default new StockProductController();
