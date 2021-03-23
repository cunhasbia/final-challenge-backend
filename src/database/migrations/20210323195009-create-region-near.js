module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('region_near', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      region_principal_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'region',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      region_near_id: {
        type: Sequelize.STRING,
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
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('region_near');
  },
};
