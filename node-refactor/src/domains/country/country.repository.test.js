/* eslint-disable no-undef */
const { createListingsData, cleanUpListingsData } = require('@test/tests.preparation');
const {getAllCountries} = require('@src/domains/country/country.repository');

describe('getListingData', () => {
  beforeAll(async () => {
    // Set up the database and create the necessary models
    await createListingsData();
  });

  afterAll(async () => {
    // Clean up the database after tests
    await cleanUpListingsData();
  });

  test('get all countries', async () => {
    const countries = await getAllCountries();
    expect(countries.length).toBe(3);
  });

});
