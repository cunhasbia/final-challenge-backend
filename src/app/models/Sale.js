import Sequelize, { Model } from 'sequelize';

class Sale extends Model {
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
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'products',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        stock_id: {
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
    this.belongsToMany(models.Product, {
      through: 'sales_products',
      as: 'products',
      foreignKey: 'product_id',
    });

    this.belongsTo(models.Stock, {
      as: 'stock',
      foreignKey: 'stock_id',
    });

    this.hasOne(models.SaleReturn, {
      as: 'sale_return',
      foreignKey: 'sale_id',
    });
  }
}

export default Sale;
