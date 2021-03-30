import { Model, DataTypes } from 'sequelize';

class Sale extends Model {
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
      as: 'products',
      foreignKey: 'product_id',
    });

    this.hasMany(models.SaleReturn, {
      as: 'sale_return',
      foreignKey: 'id',
    });

    this.belongsTo(models.Stock, {
      as: 'stock',
      foreignKey: 'stock_id',
    });

    this.belongsTo(models.Reason, {
      as: 'reasons',
      foreignKey: 'id',
    });
  }
}

export default Sale;
