import Sale from '../models/Sale';
// import Product from '../models/Product';
// import Category from '../models/Category';

class SaleController {
  async index(request, response) {
    try {
      const sale = await Sale.findAndCountAll();

      return response.json(sale);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  // async show(request, response) {}

  // envia ID do produto * verifica se o produto existe na tabela produto
  // envia quantidade
  // verifica na tabela de estoque, pelo ID do produto se existe a quantidade
  // async store(request, response) {
  //   try {
  //     const { quantity, product_id } = request.body;
  //     //     if (!quantity || !product_id ) {
  //     //       return response.status(400).json({ message: 'Invalid data' });
  //     //     }
  //     //     const parsed = Number.parseInt(product_id);
  //     //     if (Number.isNaN(parsed)) {
  //     //       return response.status(400).json({ message: 'Invalid ID' });
  //     //     }
  //     //     const product = await Product.findByPk(product_id);
  //     //     if (!product) {
  //     //       return response.status(404).json({ message: 'Reason not found' });
  //     //     }
  //     //     return response.json(product);
  //   } catch (error) {
  //     return response.status(error.status || 400).json(error.message);
  //   }
  // }

  // async update(request, response) {}

  // async delete(request, response) {
  //   try {
  //     const { id } = request.params;

  //     const parsed = parseInt(id, 10);

  //     if (Number.isNaN(parsed)) {
  //       return response.status(400).json({ message: 'Invalid ID' });
  //     }

  //     const sale = await Sale.findByPk(parsed);

  //     if (!sale) {
  //       return response.status(404).json({ message: 'Sale not found' });
  //     }

  //     await sale.destroy();

  //     return response.json();
  //   } catch (error) {
  //     return response.status(error.status || 400).json(error.message);
  //   }
  // }
}

export default new SaleController();
