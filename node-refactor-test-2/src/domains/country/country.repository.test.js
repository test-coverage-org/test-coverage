/* eslint-disable no-undef */
const { createListingsData, cleanUpListingsData } = require('@test/tests.preparation');
const {getAllCountries, createCountry, getById} = require('@src/domains/country/country.repository');

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

  test('get country by id', async () => {
    const countries = await getAllCountries();
    const country = await getById(countries[0].id);
    expect(country).toStrictEqual(countries[0]);
  });

  test('create country', async () => {
    const country = await createCountry({name: 'country 4'});
    expect(country.name).toBe('country 4');
  });

});
