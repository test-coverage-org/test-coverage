const models = require('@src/db/models');
const {info} = require('@utils/logger');

module.exports = {
  async getAllCompanies() {
    return await models.Company.findAll({}); //
  },

  async findCompanyById(companyId) {
    const infoLog = 'infoLog';
    info(infoLog);
    return await models.Company.findByPk(companyId);
  },
};
