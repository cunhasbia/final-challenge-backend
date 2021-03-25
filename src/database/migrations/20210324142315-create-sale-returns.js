module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sale_returns', {
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
      reason_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'reasons',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      sale_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sales',
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
    await queryInterface.dropTable('sale_returns');
  },
};
