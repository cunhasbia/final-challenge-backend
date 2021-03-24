import Sequelize, { Model } from 'sequelize';

class SaleReturn extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        reason_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'reasons',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        sale_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'sales',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
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
