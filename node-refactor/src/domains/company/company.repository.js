const models = require('@src/db/models');
const logger = require('@utils/logger');

module.exports = {
  async getAllCompanies() {
    return await models.Company.findAll({}); //
  },

  async findCompanyById(companyId) {
    const infoLog = 'infoLog';
    logger.info(infoLog);
    return await models.Company.findByPk(companyId); //
  },

  async findAllCompanies(){
    const infoLog = 'infoLog';
    logger.info(infoLog);
    return await models.Company.findAll({});
  }
};
