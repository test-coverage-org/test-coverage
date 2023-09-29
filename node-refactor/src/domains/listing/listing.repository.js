const { Listing, Subsidiary, Country, Company, PlatformListings } = require('@db/models');
const { NotFoundException } = require('@utils/errors');
const logger = require('@utils/logger');

module.exports = {
  async getAllListings() {
    return await Listing.findAll({});
  },

  async getListingById(id) {
    let listing = await Listing.findByPk(id);
    if (!listing) throw new NotFoundException('Listing');
    return listing;
  },

  async dummyFunction(id) {
    let listing = await Listing.findByPk(id);
    logger.info('This is a log message');
    if (!listing) throw new NotFoundException('Listing');
    return listing;
  },

  async anotherDummyFunction(id) {
    let listing = await Listing.findByPk(id);
    if (!listing) throw new NotFoundException('Listing');
    return listing;
  },

  async thirdDummyFunction(id) {
    let listing = await Listing.findByPk(id);
    if (!listing) throw new NotFoundException('Listing');
    return listing;
  },

  async updateListing(listingToUpdate, newListingData) {
    return await listingToUpdate.update({
      company_name: newListingData.companyName || listingToUpdate.companyName,
      company_logo: newListingData.companyLogo || listingToUpdate.companyLogo,
      name: newListingData.name || listingToUpdate.name,
      description: newListingData.description || listingToUpdate.description,
      info: newListingData.info || listingToUpdate.info,
      state: newListingData.state || listingToUpdate.state,
      gs: newListingData.gs || listingToUpdate.gs,
      criteria: newListingData.criteria || listingToUpdate.criteria,
    });
  },

  async getListingData(listingId) {
    return await Listing.findOne({
      where: {
        id: listingId,
      },
      attributes: ['id', 'company_name', 'company_logo', 'name', 'description', 'criteria', 'info', 'state', 'gs'],
      include: [
        {
          model: Subsidiary,
          as: 'subsidiary',
          attributes: ['id', 'name', 'logo'],
          include: [
            {
              model: Country,
              as: 'country',
              attributes: ['name', 'code'],
            },
            {
              model: Company,
              as: 'company',
              attributes: ['name', 'logo'],
            },
          ],
        },
        {
          model: PlatformListings,
          as: 'platform_listings',
          attributes: ['id', 'state'],
          where: {
            state: 'ACTIVE',
          },
          required: false,
        },
      ],
    });
  },

  async findFirstListingId() {
    return (await Listing.findAll())[0].id;
  },
};
