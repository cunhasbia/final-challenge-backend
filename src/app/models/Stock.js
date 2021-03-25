import { Model, DataTypes } from 'sequelize';

class Stock extends Model {
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
    this.hasOne(models.StockNearby, {
      as: 'stock_principal',
      foreignKey: 'stock_principal_id',
    });

    this.hasMany(models.StockNearby, {
      as: 'stock_near',
      foreignKey: 'stock_nearby_id',
    });

    this.belongsTo(models.Product, {
      as: 'stocks',
      foreignKey: 'product_id',
    });
  }
}

export default Stock;
