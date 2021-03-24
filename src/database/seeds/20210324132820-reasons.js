module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('reasons', [
      {
        description: 'Não liga',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Arranhado',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('reasons', null, {});
  },
};
