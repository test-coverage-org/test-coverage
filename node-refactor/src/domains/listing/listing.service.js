const listingRepository = require('@src/domains/listing/listing.repository');
const { ForbiddenException, BadRequestException } = require('@utils/errors');
const stepRepository = require('@src/domains/step/step.repository');
const { ListingUpdateDto } = require('@src/domains/listing/dto/listing-update.dto');
const { Roles } = require('@utils/constants');

function userIsAnEmployeeOfTheSubsidiary(listing, decodedRequest) {
  if (
    listing.subsidiary_id !== decodedRequest.user.subsidiary_id &&
    !decodedRequest.authorities.includes(Roles.ROLE_EMPLOYEE)
  ) {
    throw new ForbiddenException('Listing not found');
  }
}

async function processSteps(stepsReceived, listingId) {
  // Find all steps associated with the listing.
  const listingSteps = await stepRepository.findAllStepsByListingId(listingId);

  // Find the steps that were removed from the listing and delete them.
  let stepsToDelete = listingSteps
    .filter((listingFlow) => !stepsReceived.some((clientStep) => clientStep.id === listingFlow.id))
    .map((d) => d.id);
  await stepRepository.bulkDeleteSteps(stepsToDelete);

  // Find the steps that were updated and update them.
  const stepsToUpdate = stepsReceived.filter((step) => !!step.id && step.id > 0);
  await stepRepository.bulkUpdateSteps(stepsToUpdate);

  // Find the steps that were created and create them.
  const stepsToCreate = stepsReceived.filter((step) => !step.id || step.id < 0);
  await stepRepository.bulkCreateSteps(stepsToCreate, listingId);
}

module.exports = {
  async getListing(req, res) {
    const listing = await listingRepository.getAllListings();
    res.json(listing);
  },
  async getListingById(req, res) {
    const listing = await listingRepository.getListingById(req.params.listing_id);
    res.json(listing);
  },

  async listingUpdate(req, res) {
    let { decoded, params, body } = req;

    if (!decoded || !decoded.user) {
      throw new BadRequestException('User not found');
    }

    let listing = await listingRepository.getListingById(params.listing_id);

    // Check if the user has the appropriate permissions to update the listing.
    userIsAnEmployeeOfTheSubsidiary(listing, decoded);

    // Update the listing with the provided data.
    let updatedListing = await listingRepository.updateListing(listing, body);

    // Process the steps: update existing ones, create new ones, and delete removed ones.
    let stepsReceived = body.steps ? body.steps : [];
    await processSteps(stepsReceived, updatedListing.id);

    // Return the updated listing.
    const listingProcessed = await listingRepository.getListingData(updatedListing.id);
    return res.json(ListingUpdateDto.fromDto(listingProcessed));
  },
};
