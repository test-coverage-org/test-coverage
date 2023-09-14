/* eslint-disable no-undef */
const {createListingsData, cleanUpListingsData} = require('@test/tests.preparation');
const {getAllCountries} = require('@src/domains/country/country.service');

describe('getAllCountries', () => {
    beforeAll(async () => {
        // Set up the database and create the necessary models
        await createListingsData();
    });

    afterAll(async () => {
        // Clean up the database after tests
        await cleanUpListingsData();
    });

    test('get all countries', async () => {
        const result = await getAllCountries();
        expect(result).not.toBeNull();
    });
});
