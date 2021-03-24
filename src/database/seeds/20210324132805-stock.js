module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('stocks', [
      {
        name: 'RS',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'SC',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'PR',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('stocks', null, {});
  },
};
