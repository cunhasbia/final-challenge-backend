import { Model, DataTypes } from 'sequelize';

class Stock extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },

      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.StockNear, {
      as: 'stock_principal',
      foreignKey: 'stock_principal_id',
    });

    this.hasMany(models.StockNear, {
      as: 'stock_near',
      foreignKey: 'stock_near_id',
    });

    this.hasOne(models.Sale, {
      as: 'sale',
      foreignKey: 'stock_id',
    });

    this.hasOne(models.StockProduct, {
      as: 'stock_product',
      foreignKey: 'stock_id',
    });
  }
}

export default Stock;
