'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Roles', {
      userId: {
        type: Sequelize.INTEGER,
        references: 'Users',
        referencesKey: 'id',
      },
      role: {
        type: Sequelize.ENUM('admin', 'user'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Roles');
  },
};
