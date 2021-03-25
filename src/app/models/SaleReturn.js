import { Model, DataTypes } from 'sequelize';

class SaleReturn extends Model {
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
    this.belongsTo(models.Reason, {
      as: 'reason',
      foreignKey: 'reason_id',
    });

    this.belongsTo(models.Sale, {
      as: 'sale',
      foreignKey: 'sale_id',
    });
  }
}

export default SaleReturn;
