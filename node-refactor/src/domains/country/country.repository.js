const models = require('@src/db/models');

module.exports = {
  async getAllCountries() {
    return await models.Country.findAll({}); //
  },

  async getById(countryId) {
    return await models.Country.findByPk(countryId); //
  },

  async createCountry(country) {
    return await models.Country.create(country); //
  },

  async addAnotherCountry(country) {
    return await models.Country.create(country);
  }
};
