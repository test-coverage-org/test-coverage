const models = require('@src/db/models');

module.exports = {
  async getAllSubsidiaries() {
    return await models.Subsidiary.findAll({});
  },
};
