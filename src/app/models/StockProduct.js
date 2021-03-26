import { Model, DataTypes } from 'sequelize';

class StockProduct extends Model {
  static init(sequelize) {
    super.init(
      {
        quantity: DataTypes.INTEGER,
      },
      {
        sequelize,
        // tableName: 'stock_product',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      as: 'products',
      foreignKey: 'product_id',
    });

    this.belongsTo(models.Stock, {
      as: 'stock',
      foreignKey: 'stock_id',
    });
  }
}

export default StockProduct;
