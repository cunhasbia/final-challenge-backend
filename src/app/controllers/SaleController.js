/* eslint-disable camelcase */
/* eslint-disable radix */
import Sale from '../models/Sale';
import Product from '../models/Product';
import Stock from '../models/Stock';

class SaleController {
  async index(request, response) {
    try {
      const sale = await Sale.findAndCountAll();

      return response.json(sale);
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

      const sale = await Sale.findOne({
        where: { id },
        attributes: ['quantity'],
        include: [
          {
            model: Product,
            as: 'products',
            attributes: ['id', 'name'],
          },
          {
            model: Stock,
            as: 'stock',
            attributes: ['id', 'name'],
          },
        ],
      });

      if (!sale) {
        return response.status(404).json({ message: 'Product not found' });
      }

      return response.json(sale);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  // Falta especificar de qual estoque deverá ser retirado
  // os produtos e qual o estoque mais próximo
  async store(request, response) {
    try {
      const { quantity, product_id, stock_id } = request.body;

      if ((!quantity || !product_id, !stock_id)) {
        return response.status(400).json({ message: 'Invalid data' });
      }

      const parsedProduct = Number.parseInt(product_id);

      if (Number.isNaN(parsedProduct)) {
        return response.status(400).json({ message: 'Invalid ID' });
      }

      const parsedStock = Number.parseInt(stock_id);

      if (Number.isNaN(parsedStock)) {
        return response.status(400).json({ message: 'Invalid ID' });
      }

      const product = await Product.findByPk(product_id);

      if (!product) {
        return response.status(404).json({ message: 'Product not found' });
      }

      const stock = await Stock.findByPk(stock_id);

      if (!stock) {
        return response.status(404).json({ message: 'Stock not found' });
      }

      const sale = await Sale.create({
        quantity,
        product_id,
        stock_id,
      });

      const quantityTotal = product.total;
      product.total = quantityTotal - quantity;
      product.save();
      console.log(product.total);

      return response.json(sale);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }
}

export default new SaleController();
