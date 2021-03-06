/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable radix */
import { Op } from 'sequelize';
import Sale from '../models/Sale';
import Product from '../models/Product';
import Stock from '../models/Stock';
import StockProduct from '../models/StockProduct';
import StockNearby from '../models/StockNearby';

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

      if (Number.isNaN(Number.parseInt(id))) {
        return response.status(400).json({ message: 'Invalid ID' });
      }

      const sale = await Sale.findOne({
        where: { id },
        attributes: ['id', 'quantity'],
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
        return response
          .status(404)
          .json({ message: 'Stock product not found' });
      }

      return response.json(sale);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  async store(request, response) {
    try {
      const { quantity, product_id, stock_id } = request.body;

      if ((!quantity || !product_id, !stock_id)) {
        return response.status(400).json({ message: 'Invalid data' });
      }

      if (Number.isNaN(Number.parseInt(product_id))) {
        return response.status(400).json({ message: 'Invalid ID' });
      }

      if (Number.isNaN(Number.parseInt(stock_id))) {
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

      // Criar historico para retorno de erro
      const verifyStock = await StockProduct.findAll({
        where: {
          product_id,
          quantity: {
            [Op.gt]: 0,
          },
        },
        attributes: ['stock_id', 'quantity'],
        include: [
          {
            model: Product,
            as: 'product_stock',
            attributes: ['name', 'total'],
          },
          {
            model: StockNearby,
            as: 'stock_nearby',
            attributes: [['stock_nearby_id', 'ID estoques pr??ximos']],
          },
        ],
      });

      if (product.total < quantity) {
        return response.status(404).json({ 'Qtde indispon??vel': verifyStock });
      }

      // consulta nas tabelas para fazer a venda
      let stockProduct = await StockProduct.findOne({
        where: {
          product_id,
          stock_id,
        },
      });

      if (!stockProduct) {
        return response.status(404).json({ message: 'Stock not found' });
      }

      // ENTRA NO PRIMEIRO ESTOQUE PR??XIMO
      if (stockProduct.quantity < quantity) {
        // console.log(
        //   `-> ############ entrou verifica????o 1 ${stockProduct.stock_id}`
        // );
        const stockPrincipal = await StockNearby.findByPk(stock_id);

        stockProduct = await StockProduct.findOne({
          where: {
            product_id,
            stock_id: parseInt(stockPrincipal.stock_nearby_id),
          },
        });

        // ENTRA NO SEGUNDO ESTOQUE PR??XIMO
        if (!stockProduct || stockProduct.quantity < quantity) {
          // console.log('entrou verifica????o 2');
          const value = stockPrincipal.stock_nearby_id;

          stockProduct = await StockProduct.findOne({
            where: {
              product_id,
              stock_id: parseInt(value[2]),
            },
          });

          if (!stockProduct) {
            return response.json({ Error: 'Empty stock!' });
          }

          // salva a venda
          const sale = await Sale.create({
            quantity,
            product_id,
            stock_id: stockProduct.stock_id,
          });

          // atualiza o estoque geral
          const quantityTotal = product.total;
          product.total = quantityTotal - quantity;
          product.save();

          // atualiza o estoque local
          const stockTotal = stockProduct.quantity;
          stockProduct.quantity = stockTotal - quantity;
          stockProduct.save();

          return response.json(sale);
        }

        const sale = await Sale.create({
          quantity,
          product_id,
          stock_id: stockProduct.stock_id,
        });

        const quantityTotal = product.total;
        product.total = quantityTotal - quantity;
        product.save();

        const stockTotal = stockProduct.quantity;
        stockProduct.quantity = stockTotal - quantity;
        stockProduct.save();
        return response.json(sale);
      }

      const sale = await Sale.create({
        quantity,
        product_id,
        stock_id,
      });

      const quantityTotal = product.total;
      product.total = quantityTotal - quantity;
      product.save();

      const stockTotal = stockProduct.quantity;
      stockProduct.quantity = stockTotal - quantity;
      stockProduct.save();

      return response.json(sale);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }
}

export default new SaleController();
