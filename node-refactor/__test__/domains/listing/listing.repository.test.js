/* eslint-disable no-undef */
const { getListingData, dummyFunction} = require('@src/domains/listing/listing.repository');
const { PlatformListings } = require('@db/models');
const { createListingsData, cleanUpListingsData } = require('@test/tests.preparation');
const {getAllCountries} = require('@src/domains/country/country.repository');

describe('getListingData', () => {
  beforeAll(async () => {
    // Set up the database and create the necessary models
    await createListingsData(); //todo: create a function to create a listing with all the necessary data, not everything is needed
  });

  afterAll(async () => {
    // Clean up the database after tests
    await cleanUpListingsData();
  });

  test('should return listing data for a valid listing id', async () => {
    const listingId = 1;
    const result = await getListingData(listingId);
    expect(result).not.toBeNull();
    expect(result.id).toBe(listingId);
  });

  test('should return null for an invalid listing id', async () => {
    const invalidListingId = -1; // An id that doesn't exist in the database
    const result = await getListingData(invalidListingId);
    expect(result).toBeNull();
  });

  test('should return subsidiary data for a valid listing id', async () => {
    const listingId = 1;
    const result = await getListingData(listingId);
    expect(result).toHaveProperty('subsidiary');
    expect(result.subsidiary).not.toBeNull();
  });

  test('should return country data for a valid listing id', async () => {
    const listingId = 1;
    const result = await getListingData(listingId);
    expect(result.subsidiary).toHaveProperty('country');
    expect(result.subsidiary.country).not.toBeNull();
  });

  test('should return company data for a valid listing id', async () => {
    const listingId = 1;
    const result = await getListingData(listingId);
    expect(result.subsidiary).toHaveProperty('company');
    expect(result.subsidiary.company).not.toBeNull();
  });

  test('should return platform listings data for a valid listing id', async () => {
    const listingId = 1;
    const result = await getListingData(listingId);
    expect(result).toHaveProperty('platform_listings');
    expect(result.platform_listings).toBeDefined();
  });

  test('should return correct platformListings count for a valid listing id', async () => {
    const listingId = 1;
    const result = await getListingData(listingId);
    const platformListingsCount = await PlatformListings.count({
      where: {
        listing_id: listingId,
        state: 'ACTIVE',
      },
    });
    expect(result.platform_listings.length).toBe(platformListingsCount);
  });

  test('should return null for an invalid listing id', async () => {
    const invalidListingId = -1; // An id that doesn't exist in the database
    const result = await getListingData(invalidListingId);
    expect(result).toBeNull();
  });

  //test dummy function
  test('should return listing data for a valid listing id', async () => {
    const listingId = 1;
    const result = await dummyFunction(listingId);
    expect(result).not.toBeNull();
    expect(result.id).toBe(listingId);
  });
});

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
