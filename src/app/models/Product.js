import { Model, DataTypes } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        price: DataTypes.FLOAT,
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

    this.hasOne(models.Stock, {
      as: 'products',
      foreignKey: 'product_id',
    });
  }
}

export default Product;
