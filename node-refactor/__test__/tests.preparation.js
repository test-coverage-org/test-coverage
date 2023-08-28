const { Listing, Subsidiary, Country, Company, PlatformListings } = require('@db/models');

module.exports = {
  async createListingsData() {
    let sampleLogoUrl = 'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg';

    // Country
    await Country.bulkCreate([
      { name: 'Argentina', code: 'AR' },
      { name: 'Mexico', code: 'MX' },
      { name: 'United States of America', code: 'US' },
    ]);

    // Company
    await Company.bulkCreate([
      { name: 'Company A', logo: sampleLogoUrl },
      { name: 'Company B', logo: sampleLogoUrl },
      { name: 'Company C', logo: sampleLogoUrl },
    ]);

    // Subsidiary
    await Subsidiary.bulkCreate([
      { name: 'Subsidiary A', logo: sampleLogoUrl, country_id: 1, company_id: 1 },
      { name: 'Subsidiary B', logo: sampleLogoUrl, country_id: 2, company_id: 2 },
    ]);

    // Listing
    await Listing.bulkCreate([
      {
        company_name: 'Company A',
        company_logo: sampleLogoUrl,
        name: 'Listing A',
        description: 'Some Listing',
        criteria: 'some criteria',
        info: 'some info',
        state: 'ACTIVE',
        gs: '',
        subsidiary_id: 1,
      },
      {
        company_name: 'Company A',
        company_logo: sampleLogoUrl,
        name: 'Listing B',
        description: 'Some Listing',
        criteria: 'some criteria',
        info: 'some info',
        state: 'INACTIVE',
        gs: '',
        subsidiary_id: 1,
      },
      {
        company_name: 'Company B',
        company_logo: sampleLogoUrl,
        name: 'Listing A',
        description: 'Some Listing',
        criteria: 'some criteria',
        info: 'some info',
        state: 'INACTIVE',
        gs: '',
        subsidiary_id: 2,
      },
    ]);

    // platform_listings
    await PlatformListings.bulkCreate([
      { listing_id: 1, state: 'ACTIVE' },
      { listing_id: 2, state: 'INACTIVE' },
      { listing_id: 3, state: 'ACTIVE' },
    ]);
  },
  async cleanUpListingsData() {
    await PlatformListings.destroy({ where: {} });
    await Listing.destroy({ where: {} });
    await Subsidiary.destroy({ where: {} });
    await Company.destroy({ where: {} });
    await Country.destroy({ where: {} });
  },
};
