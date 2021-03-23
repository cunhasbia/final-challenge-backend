import Sequelize, { Model } from 'sequelize';

class Region extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
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
    this.belongsTo(models.Inventory, {
      as: 'inventory',
      foreignKey: 'region_id',
    });

    this.belongsToMany(models.Region, {
      as: 'region-near',
      foreignKey: 'region_id',
      through: 'region-near',
    });
  }
}

export default Region;
