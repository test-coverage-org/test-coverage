/* eslint-disable no-undef */
const {createListingsData, cleanUpListingsData} = require('@test/tests.preparation');
const {getAllSubsidiaries} = require('@src/domains/subsidiary/subsidiary.repository');

describe('getAllSubsidiaries', () => {
  beforeAll(async () => {
    // Set up the database and create the necessary models
    await createListingsData();
  });

  afterAll(async () => {
    // Clean up the database after tests
    await cleanUpListingsData();
  });

  test('should return all subsidiaries', async () => {
    const result = await getAllSubsidiaries();
    expect(result.length).toBe(2);
  });

});
