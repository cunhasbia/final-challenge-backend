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
      foreignKey: 'reason_id',
    });
  }
}

export default Reason;
