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
    this.hasMany(models.Sale, {
      as: 'sale',
      foreignKey: 'id',
    });

    this.belongsToMany(models.StockProduct, {
      as: 'stock',
      foreignKey: 'stock_id',
      through: 'stock_products',
    });

    this.hasMany(models.StockNearby, {
      as: 'stock_principal',
      foreignKey: 'id',
    });

    // this.hasMany(models.StockNearby, {
    //   as: 'stock_nearby',
    //   foreignKey: 'id',
    // });
  }
}

export default Stock;
