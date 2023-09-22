const countryRepository = require('@src/domains/country/country.repository');

module.exports = {
  async getAllCountries(req, res) {
    let allCountries = await countryRepository.getAllCountries();
    res.send(allCountries);
  },

  async getCountryById(req, res) {
    let countryId = req.params.id; //
    let country = await countryRepository.getById(countryId);
    res.send(country);
  }
};
