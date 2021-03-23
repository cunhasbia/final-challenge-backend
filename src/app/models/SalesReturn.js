import Sequelize, { Model } from 'sequelize';

class SalesReturn extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        sales_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'sales',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        return_reasons_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'return_reasons',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        total: {
          type: Sequelize.FLOAT,
          allowNull: false,
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
    this.hasOne(models.ReturnReasons, {
      as: 'return_reasons',
      foreignKey: 'return_reasons_id',
    });
  }
}

export default SalesReturn;
