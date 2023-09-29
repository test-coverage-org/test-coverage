const models = require('@src/db/models');

module.exports = {
  async getAllCompanies() {
    return await models.Company.findAll({}); //
  },

  async findCompanyById(companyId) {
    return await models.Company.findByPk(companyId); //
  },
};
