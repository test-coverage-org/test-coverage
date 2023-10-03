const { Listing, Subsidiary, Country, Company, PlatformListings } = require('@db/models');

module.exports = {
  async createListingsData() {
    let sampleLogoUrl = 'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg';

    // Country
    const countries = await Country.bulkCreate([
      { name: 'Argentina', code: 'AR' },
      { name: 'Mexico', code: 'MX' },
      { name: 'United States of America', code: 'US' },
    ]);

    // Company
    const companies = await Company.bulkCreate([
      { name: 'Company A', logo: sampleLogoUrl },
      { name: 'Company B', logo: sampleLogoUrl },
      { name: 'Company C', logo: sampleLogoUrl },
    ]);

    // Subsidiary

    const subsidiaries = await Subsidiary.bulkCreate([
      { name: 'Subsidiary A', logo: sampleLogoUrl, country_id: countries[0].id, company_id: companies[0].id },
      { name: 'Subsidiary B', logo: sampleLogoUrl, country_id: countries[1].id, company_id: companies[1].id },
    ]);

    // Listing
    const listing = await Listing.bulkCreate([
      {
        company_name: 'Company A',
        company_logo: sampleLogoUrl,
        name: 'Listing A',
        description: 'Some Listing',
        criteria: 'some criteria',
        info: 'some info',
        state: 'ACTIVE',
        gs: '',
        subsidiary_id: subsidiaries[0].id,
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
        subsidiary_id: subsidiaries[0].id,
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
        subsidiary_id: subsidiaries[1].id,
      },
    ]);

    // platform_listings
    await PlatformListings.bulkCreate([
      { listing_id: listing[0].id, state: 'ACTIVE' },
      { listing_id: listing[1].id, state: 'INACTIVE' },
      { listing_id: listing[2].id, state: 'ACTIVE' },
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
