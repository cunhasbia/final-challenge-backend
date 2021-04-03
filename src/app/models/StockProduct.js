import { Model, DataTypes } from 'sequelize';

class StockProduct extends Model {
  static init(sequelize) {
    super.init(
      {
        quantity: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      as: 'product_stock',
      foreignKey: 'product_id',
    });

    this.belongsTo(models.Stock, {
      as: 'stock',
      foreignKey: 'stock_id',
    });
    this.belongsTo(models.StockNearby, {
      as: 'stock_nearby',
      foreignKey: 'stock_id',
    });
  }
}

export default StockProduct;
