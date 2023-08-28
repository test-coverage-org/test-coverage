const models = require('@src/db/models');

module.exports = {
  async getAllPlatformListing() {
    return await models.PlatformListings.findAll({});
  },
};
