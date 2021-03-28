import { Model, DataTypes } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        price: DataTypes.FLOAT,
        total: DataTypes.INTEGER,
      },

      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'category_id',
    });

    this.hasMany(models.Sale, {
      as: 'sale',
      foreignKey: 'product_id',
    });

    this.belongsToMany(models.StockProduct, {
      as: 'product_stock',
      foreignKey: 'product_id',
      through: 'stock_products',
    });
  }
}

export default Product;
