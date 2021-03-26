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
      as: 'sales',
      foreignKey: 'product_id',
    });

    this.belongsToMany(models.Stock, {
      foreignKey: 'product_id',
      otherKey: 'stock_id',
      through: 'stock_product',
      as: 'stocks',
    });
  }
}

export default Product;
