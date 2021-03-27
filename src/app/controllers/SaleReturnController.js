/* eslint-disable radix */
/* eslint-disable no-unused-vars */
import Reason from '../models/Reason';
import Sale from '../models/Sale';
import SaleReturn from '../models/SaleReturn';
import Stock from '../models/Stock';

class SaleReturnController {
  async index(request, response) {
    //   try {
    //     const saleReturn = await SaleReturn.findAndCountAll();
    //     return response.json(saleReturn);
    //   } catch (error) {
    //     return response.status(error.status || 400).json(error.message);
    //   }
    // }

    try {
      const saleReturn = await SaleReturn.findAndCountAll({
        include: [
          {
            model: Sale,
            as: 'sale',
            attributes: ['sale_id'],
          },
          {
            model: Reason,
            as: 'reason',
            attributes: ['reason_id'],
          },
          {
            model: Stock,
            as: 'stock',
            attributes: ['product_id'],
          },
        ],
      });
      return response.json(saleReturn);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  // async show(request, response) {}

  async store(request, response) {
    try {
      const { quantity, reasonId, saleId } = request.body;

      if (!quantity || !reasonId || !saleId) {
        return response.status(400).json({ message: 'Invalid data' });
      }

      const parsedReason = Number.parseInt(reasonId);
      const parsedSale = Number.parseInt(saleId);

      if (Number.isNaN(parsedReason)) {
        return response.status(400).json({ message: 'Invalid ID' });
      }

      if (Number.isNaN(parsedSale)) {
        return response.status(400).json({ message: 'Invalid ID' });
      }

      const reason = await Reason.findByPk(reasonId);
      const sale = await Sale.findByPk(saleId);

      if (!reason) {
        return response.status(404).json({ message: 'Reason not found' });
      }

      if (!sale) {
        return response.status(404).json({ message: 'Sale not found' });
      }

      // verifica se a quantidade devolvida não é maior do que vendida

      if (quantity > sale.quantity) {
        return response.status(404).json({ message: 'Quantity invalid' });
      }

      const saleReturn = await SaleReturn.create({
        quantity,
        reasonId,
        saleId,
      });

      return response.json(saleReturn);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }
}

export default new SaleReturnController();
