const models = require('@src/db/models');

module.exports = {
  async getAllPlatformListing() {
    return await models.PlatformListings.findAll({}); //
  },

  async getPlatformListingById(id) {
    return await models.PlatformListings.findByPk(id);
  }
};
