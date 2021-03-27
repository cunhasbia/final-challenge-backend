module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('stock_nearby', [
      {
        stock_id: 1,
        stock_nearby_id: '2,3',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        stock_id: 2,
        stock_nearby_id: '1,3',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        stock_id: 3,
        stock_nearby_id: '2,1',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('stock_nearby', null, {});
  },
};
