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
    this.hasOne(models.StockNearby, {
      as: 'stock_principal',
      foreignKey: 'stock_principal_id',
    });

    this.hasMany(models.StockNearby, {
      as: 'stock_nearby',
      foreignKey: 'stock_nearby_id',
    });

    this.belongsToMany(models.Product, {
      foreignKey: 'stock_id',
      otherKey: 'product_id',
      through: 'stock_product',
      as: 'products',
    });

    this.belongsToMany(models.Product, {
      foreignKey: 'product_id',
      through: 'product_id',
      as: 'product',
    });
  }
}

export default Stock;
