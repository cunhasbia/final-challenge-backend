import Sequelize, { Model } from 'sequelize';

class StockNear extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        stock_principal_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'stocks',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        stock_near_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'stocks',
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
    this.belongsTo(models.Stock, {
      as: 'stock',
      foreignKey: 'stock_id',
    });
  }
}

export default StockNear;
