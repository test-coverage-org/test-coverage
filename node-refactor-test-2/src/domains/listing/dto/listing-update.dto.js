class ListingUpdateDto {
  constructor() {
    this.subsidiaryId = null;
    this.countryName = null;
    this.countryCode = null;
    this.subsidiaryName = null;
    this.subsidiaryLogo = null;
    this.id = null;
    this.companyName = null;
    this.companyLogo = null;
    this.name = null;
    this.description = null;
    this.criteria = null;
    this.info = null;
    this.state = null;
    this.gs = null;
    this.platformListings = null;
  }

  static fromDto(listing) {
    const newListing = new ListingUpdateDto();

    let subsidiary = listing.subsidiary;

    newListing.subsidiaryId = subsidiary.id;
    newListing.countryName = subsidiary.country.name;
    newListing.countryCode = subsidiary.country.code;
    newListing.subsidiaryName = subsidiary.name !== undefined ? subsidiary.name : subsidiary.company.name;
    newListing.subsidiaryLogo = subsidiary.logo !== undefined ? subsidiary.logo : subsidiary.company.logo;
    newListing.id = listing.id;
    newListing.companyName = listing.company_name;
    newListing.companyLogo = listing.company_logo;
    newListing.name = listing.name;
    newListing.description = listing.description;
    newListing.criteria = listing.criteria;
    newListing.info = listing.info;
    newListing.state = listing.state;
    newListing.gs = listing.gs;
    newListing.platformListings = listing.platform_listings.length;

    return newListing;
  }
}

module.exports = { ListingUpdateDto };
