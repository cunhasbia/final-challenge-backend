module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('stock_near', [
      {
        stock_principal_id: 1,
        stock_near_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        stock_principal_id: 2,
        stock_near_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        stock_principal_id: 3,
        stock_near_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('stock_near', null, {});
  },
};
