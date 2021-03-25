module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('stocks', [
      {
        quantity: 10,
        product_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        quantity: 20,
        product_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        quantity: 30,
        product_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('stocks', null, {});
  },
};
