module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Livro 01',
        price: 19,
        total: 10,
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Livro 02',
        price: 25,
        total: 20,
        category_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Livro 03',
        price: 55,
        total: 30,
        category_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
