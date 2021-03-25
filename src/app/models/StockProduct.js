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
    this.belongsToMany(models.Product, {
      through: 'stock_and_products',
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
