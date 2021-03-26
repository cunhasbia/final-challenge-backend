import { Model, DataTypes } from 'sequelize';

class StockProduct extends Model {
  static init(sequelize) {
    super.init(
      {
        quantity: DataTypes.INTEGER,
      },
      {
        sequelize,
        tableName: 'stock_product',
      }
    );

    return this;
  }
}

export default StockProduct;
