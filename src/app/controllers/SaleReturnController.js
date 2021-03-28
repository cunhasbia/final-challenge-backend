/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable radix */
/* eslint-disable no-unused-vars */
import Reason from '../models/Reason';
import Sale from '../models/Sale';
import SaleReturn from '../models/SaleReturn';
import Product from '../models/Product';
import Category from '../models/Category';
import StockProduct from '../models/StockProduct';
// eslint-disable-next-line import/order
import Sequelize from 'sequelize';

class SaleReturnController {
  async index(request, response) {
    try {
      const saleReturn = await SaleReturn.findAll({
        attributes: [
          [Sequelize.fn('sum', Sequelize.col('SaleReturn.quantity')), 'total'],
        ],
        raw: true,
        group: [
          'sale.id',
          'sale->product.id',
          'reason.id',
          'sale->product->category.id',
        ],
        order: Sequelize.literal('total DESC'),
        limit: 1,
        include: [
          {
            model: Reason,
            as: 'reason',
            attributes: ['id', 'description'],
          },
          {
            model: Sale,
            as: 'sale',
            attributes: ['id'],
            include: {
              model: Product,
              required: true,
              as: 'product',
              attibutes: ['id', 'name'],
              include: {
                model: Category,
                required: true,
                as: 'category',
                attibutes: ['id', 'name'],
              },
            },
          },
        ],
      });

      return response.json(saleReturn[0]);
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

      const returnSale = await SaleReturn.findOne({
        where: { id },
        // attributes: ['quantity'],
        include: [
          {
            model: Sale,
            as: 'sale',
            attributes: ['id'],
          },
          {
            model: Reason,
            as: 'reason',
            attributes: ['description'],
          },
        ],
      });

      if (!returnSale) {
        return response.status(404).json({ message: 'Return Sale not found' });
      }

      return response.json(returnSale);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async store(request, response) {
    try {
      const { quantity, reason_id, sale_id } = request.body;

      if (!quantity || !reason_id || !sale_id) {
        return response.status(400).json({ message: 'Invalid data' });
      }

      const parsedReason = Number.parseInt(reason_id);
      const parsedSale = Number.parseInt(sale_id);

      if (Number.isNaN(parsedReason)) {
        return response.status(400).json({ message: 'Invalid ID' });
      }

      if (Number.isNaN(parsedSale)) {
        return response.status(400).json({ message: 'Invalid ID' });
      }

      const reason = await Reason.findByPk(reason_id);
      const sale = await Sale.findByPk(sale_id);

      if (!reason) {
        return response.status(404).json({ message: 'Reason not found' });
      }

      if (!sale) {
        return response.status(404).json({ message: 'Sale not found' });
      }

      // verifica se a quantidade devolvida não é maior do que vendida
      if (quantity > sale.quantity) {
        return response
          .status(400)
          .json({ Error: `Quantity available for return: ${sale.quantity}` });
      }

      // verifica se a quantidade devolvida nao e maior que a soma das devolucoes
      const verifySaleReturn = await SaleReturn.findAll({
        attributes: [
          [Sequelize.fn('sum', Sequelize.col('SaleReturn.quantity')), 'total'],
        ],
        where: { sale_id },
      });

      // criar historico de devolucoes
      const historySaleReturn = await SaleReturn.findAll({
        attributes: [
          ['id', 'Id Sale Return'],
          ['quantity', 'Quantity returned'],
        ],
        where: { sale_id },
      });

      const sum =
        sale.quantity - parseInt(verifySaleReturn[0].dataValues.total);

      if (quantity > sum) {
        return response.status(400).json({
          Error: `Quantity available for return: ${sum}`,
          historySaleReturn,
        });
      }

      // // devolve a quantidade para o estoque
      const stockProduct = await StockProduct.findOne({
        where: { product_id: sale.product_id, stock_id: sale.stock_id },
      });

      let quantityTotal = stockProduct.quantity;
      stockProduct.quantity = quantityTotal + quantity;
      stockProduct.save();

      const product = await Product.findOne({
        where: { id: sale.product_id },
      });

      quantityTotal = product.total;
      product.total = quantityTotal + quantity;
      product.save();

      // Salva na tabela SaleReturn
      const saleReturn = await SaleReturn.create({
        quantity,
        reason_id,
        sale_id,
      });

      return response.json(saleReturn);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }
}

export default new SaleReturnController();
