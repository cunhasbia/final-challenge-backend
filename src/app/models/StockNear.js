import { Model } from 'sequelize';

class StockNear extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Stock, {
      as: 'stock',
      foreignKey: 'stock_id',
    });
  }
}

export default StockNear;
