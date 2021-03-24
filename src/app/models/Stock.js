import Sequelize, { Model } from 'sequelize';

class Stock extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
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
    this.hasOne(models.StockNear, {
      as: 'stock_principal',
      foreignKey: 'stock_principal_id',
    });

    this.hasMany(models.StockNear, {
      as: 'stock_near',
      foreignKey: 'stock_near_id',
    });

    this.hasOne(models.Sale, {
      as: 'sale',
      foreignKey: 'stock_id',
    });

    this.hasOne(models.StockProduct, {
      as: 'stock_product',
      foreignKey: 'stock_id',
    });
  }
}

export default Stock;
