const models = require('@src/db/models');

module.exports = {
  async getAllCountries() {
    return await models.Country.findAll({});
  },
};
