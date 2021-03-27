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
    this.belongsToMany(models.Product, {
      through: 'sales_products',
      as: 'products',
      foreignKey: 'product_id',
    });

    this.hasOne(models.SaleReturn, {
      as: 'sale_return',
      foreignKey: 'sale_id',
    });

    this.belongsTo(models.Reason, {
      as: 'reasons',
      foreignKey: 'sale_id',
    });
  }
}

export default Sale;
