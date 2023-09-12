/* eslint-disable no-undef */
const listingService = require('@src/domains/listing/listing.service');

const listingRepository = require('@src/domains/listing/listing.repository');
jest.mock('@src/domains/listing/listing.repository');

const stepRepository = require('@src/domains/step/step.repository');
jest.mock('@src/domains/step/step.repository');

const userRepository = require('@src/domains/user/user.repository');
jest.mock('@src/domains/user/user.repository');

const { ListingUpdateDto } = require('@src/domains/listing/dto/listing-update.dto');

describe('listingUpdate', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // Test 1: User not found
  test('should throw a BadRequestException when user is not found', async () => {
    userRepository.getUserById.mockResolvedValue(null);

    const req = {
      decoded: {},
      params: { listing_id: 1 },
      body: {},
    };

    await expect(listingService.listingUpdate(req, {})).rejects.toThrow('User not found');
  });

  // Test 2: User is not an employee of the subsidiary
  test('should throw a ForbiddenException when user is not an employee of the subsidiary', async () => {
    const listing = {
      subsidiary_id: 1,
    };

    listingRepository.getListingById.mockResolvedValue(listing);

    const req = {
      decoded: {
        user: {
          subsidiary_id: 2,
        },
        authorities: [],
      },
      params: { listing_id: 1 },
      body: {},
    };

    await expect(listingService.listingUpdate(req, {})).rejects.toThrow('Listing not found');
  });

  // Test 3: Throw ForbiddenException, not an employee of the subsidiary
  test('should not throw ForbiddenException if user is an employee of the subsidiary', async () => {
    const req = {
      decoded: {
        user: { id: 1, subsidiary_id: 2 },
        authorities: ['ROLE_EMPLOYEE'],
      },
      params: { listing_id: 1 },
      body: {
        companyName: 'New Company Name',
      },
    };

    const mockGetListingById = jest.spyOn(listingRepository, 'getListingById');
    mockGetListingById.mockResolvedValue({ subsidiary_id: 2 });

    const res = { json: jest.fn() };

    const mockUpdateListing = jest.spyOn(listingRepository, 'updateListing');
    mockUpdateListing.mockResolvedValue({ id: 1 });

    const mockGetListingData = jest.spyOn(listingRepository, 'getListingData');
    mockGetListingData.mockResolvedValue({});

    const listingFromDtoSpy = jest.spyOn(ListingUpdateDto, 'fromDto');
    listingFromDtoSpy.mockResolvedValue({});

    stepRepository.findAllStepsByListingId.mockResolvedValue([]);

    await listingService.listingUpdate(req, res);

    expect(mockUpdateListing).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();

    mockGetListingById.mockRestore();
    mockUpdateListing.mockRestore();
    mockGetListingData.mockRestore();
  });

  // Test 4: Successful update without steps
  test('should successfully update listing without steps', async () => {
    const listing = {
      subsidiary_id: 1,
    };

    listingRepository.getListingById.mockResolvedValue(listing);
    listingRepository.updateListing.mockResolvedValue(listing);
    listingRepository.getListingData.mockResolvedValue(listing);
    stepRepository.findAllStepsByListingId.mockResolvedValue([]);

    const listingFromDtoSpy = jest.spyOn(ListingUpdateDto, 'fromDto');
    listingFromDtoSpy.mockResolvedValue({});

    const req = {
      decoded: {
        user: {
          subsidiary_id: 1,
        },
        authorities: [],
      },
      params: { listing_id: 1 },
      body: {
        companyName: 'New Company Name',
      },
    };

    const res = {
      json: jest.fn(),
    };

    await listingService.listingUpdate(req, res);

    expect(listingRepository.updateListing).toHaveBeenCalled();
    expect(ListingUpdateDto.fromDto).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();

    listingFromDtoSpy.mockRestore();
  });

  // Test 5: Successful update with steps
  // test('should successfully update listing with steps', async () => {
  //   const listing = {
  //     subsidiary_id: 1,
  //   };
  //
  //   let steps = [
  //     { id: 1, title: 'Step 1', description: 'Description 1' },
  //     { id: 2, title: 'Step 2', description: 'Description 2' },
  //     { title: 'Step 3', description: 'Description 3' },
  //   ];
  //
  //   const req = {
  //     decoded: {
  //       user: {
  //         subsidiary_id: 1,
  //       },
  //       authorities: [],
  //     },
  //     params: { listing_id: 1 },
  //     body: {
  //       companyName: 'New Company Name',
  //       steps: steps,
  //     },
  //   };
  //
  //   const listingDataInput = {
  //     id: 1,
  //     company_name: 'companyName',
  //     company_logo: 'companyLogo',
  //     name: 'name',
  //     description: 'description',
  //     criteria: 'criteria',
  //     info: 'info',
  //     state: 'state',
  //     gs: 'gs',
  //     subsidiary: {
  //       id: 1,
  //       name: 'Subsidiary A',
  //       logo: 'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
  //       country: {
  //         name: 'Argentina',
  //         code: 'AR',
  //       },
  //       company: {
  //         name: 'Company A',
  //         logo: 'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
  //       },
  //     },
  //     platform_listings: [
  //       {
  //         id: 1,
  //         state: 'ACTIVE',
  //       },
  //     ],
  //   };
  //
  //   const listingDataOutput = {
  //     subsidiaryId: 1,
  //     countryName: 'Argentina',
  //     countryCode: 'AR',
  //     subsidiaryName: 'Subsidiary A',
  //     subsidiaryLogo: 'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
  //     id: 1,
  //     companyName: 'companyName',
  //     companyLogo: 'companyLogo',
  //     name: 'name',
  //     description: 'description',
  //     criteria: 'criteria',
  //     info: 'info',
  //     state: 'state',
  //     gs: 'gs',
  //     platformListings: 1,
  //   };
  //
  //   const listingFromDtoSpy = jest.spyOn(ListingUpdateDto, 'fromDto');
  //
  //   listingRepository.getListingById.mockResolvedValue(listing);
  //   listingRepository.updateListing.mockResolvedValue(listing);
  //   listingRepository.getListingData.mockResolvedValue(listingDataInput);
  //   stepRepository.findAllStepsByListingId.mockResolvedValue([steps[0], steps[1]]);
  //   stepRepository.bulkDeleteSteps.mockResolvedValue();
  //   stepRepository.bulkUpdateSteps.mockResolvedValue();
  //   stepRepository.bulkCreateSteps.mockResolvedValue([steps[2]]);
  //
  //   const res = {
  //     json: jest.fn(),
  //   };
  //
  //   await listingService.listingUpdate(req, res);
  //
  //   expect(stepRepository.findAllStepsByListingId).toHaveBeenCalled();
  //   expect(stepRepository.bulkDeleteSteps).toHaveBeenCalled();
  //   expect(stepRepository.bulkUpdateSteps).toHaveBeenCalled();
  //   expect(stepRepository.bulkCreateSteps).toHaveBeenCalled();
  //   expect(listingRepository.updateListing).toHaveBeenCalled();
  //   expect(res.json).toHaveBeenCalled();
  //   expect(listingFromDtoSpy).toHaveBeenCalledTimes(1);
  //   expect(listingFromDtoSpy).toHaveReturnedWith(listingDataOutput);
  //
  //   listingFromDtoSpy.mockRestore();
  // });
});
