import Sequelize, { Model } from 'sequelize';

class RegionNear extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        region_principal_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'region',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        region_near_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'region',
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
}

export default RegionNear;
