const {createListingsData} = require('@test/tests.preparation');
const {getAllCountries} = require('@src/domains/country/country.repository');

describe('getAllCountries', () => {
  beforeAll(async () => {
    // Set up the database and create the necessary models
    await createListingsData(); //todo: create a function to create a listing with all the necessary data, not everything is needed
  });

  test('get all countries', async () => {
    const result = await getAllCountries();
    expect(result).not.toBeNull();
    expect(result).toHaveLength(3);
  });
});
