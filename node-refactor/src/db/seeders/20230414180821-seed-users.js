'use strict';

const { randomPassword } = require('../../utils/utils');
const { Roles } = require('../../utils/constants');
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    // Roles
    await queryInterface.bulkInsert('roles', [
      {
        name: Roles.ROLE_EMPLOYEE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: Roles.ROLE_ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Users
    await queryInterface.bulkInsert('users', [
      {
        first_name: 'Maximiliano',
        last_name: 'Adaro',
        email: 'maxiadaro1999@gmail.com',
        password: randomPassword(),
        subsidiary_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: 'Test',
        last_name: 'Test',
        email: 'email@test.com',
        password: randomPassword(),
        subsidiary_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // UserRoles
    await queryInterface.bulkInsert('user_roles', [
      {
        user_id: 1,
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('user_roles', null, {});
  },
};
