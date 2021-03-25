module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('sale_returns', [
      {
        quantity: 10,
        reason_id: 1,
        sale_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        quantity: 30,
        reason_id: 1,
        sale_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        quantity: 15,
        reason_id: 2,
        sale_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('sale_returns', null, {});
  },
};
