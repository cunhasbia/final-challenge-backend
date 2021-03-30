import { Model, DataTypes } from 'sequelize';

class Reason extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.SaleReturn, {
      as: 'sale_return',
    });
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'id',
    });
    this.hasMany(models.Category, {
      as: 'category',
      foreignKey: 'id',
    });
  }
}

export default Reason;
