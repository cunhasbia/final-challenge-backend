import { Model, DataTypes } from 'sequelize';

class StockNearby extends Model {
  static init(sequelize) {
    super.init(
      {
        stock_nearby_id: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'stock_nearby',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Stock, {
      as: 'stock_principal',
      foreignKey: 'stock_id',
    });

    this.hasMany(models.StockProduct, {
      as: 'stock_nearby',
      foreignKey: 'stock_id',
    });

    // this.belongsTo(models.Stock, {
    //   as: 'stock_nearby',
    //   foreignKey: 'stock_nearby_id',
    // });
  }
}

export default StockNearby;
