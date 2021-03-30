module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('sale_returns', [
      {
        quantity: 5,
        reason_id: 1,
        sale_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('sale_returns', null, {});
  },
};
