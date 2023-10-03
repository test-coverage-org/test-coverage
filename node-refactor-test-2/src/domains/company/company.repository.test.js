/* eslint-disable no-undef */
const { createListingsData, cleanUpListingsData } = require('@test/tests.preparation');
const {getAllCompanies} = require('@src/domains/company/company.repository');

describe('getListingData', () => {
  beforeAll(async () => {
    // Set up the database and create the necessary models
    await createListingsData();
  });

  afterAll(async () => {
    // Clean up the database after tests
    await cleanUpListingsData();
  });

  test('get all companies', async () => {
    const countries = await getAllCompanies();
    expect(countries.length).toBe(3);
  });

});
