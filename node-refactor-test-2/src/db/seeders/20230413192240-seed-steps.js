'use strict';

const { randomNumber } = require('../../utils/utils');
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

    // Steps
    await queryInterface.bulkInsert('steps', [
      {
        listing_id: 1,
        flowId: randomNumber(),
        name: 'Step 1',
        step: JSON.stringify({
          type: 'text',
          text: 'Step 1',
        }),
        listingFlow: JSON.stringify({
          listing_id: 1,
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        listing_id: 2,
        flowId: randomNumber(),
        name: 'Step 2',
        step: JSON.stringify({
          type: 'text',
          text: 'Step 2',
        }),
        listingFlow: JSON.stringify({
          listing_id: 2,
        }),
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
    await queryInterface.bulkDelete('steps', null, {});
  },
};
