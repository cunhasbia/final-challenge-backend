import { Model, DataTypes } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },

      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'category_id',
    });
  }
}

export default Category;
