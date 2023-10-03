const express = require('express');
const listingService = require('@src/domains/listing/listing.service');
const { asyncHandler } = require('@utils/errors');
const { withUserDecoded } = require('@src/middlewares/auth.middleware');

const listingController = express.Router();

listingController.get('/get-all', asyncHandler(listingService.getListing));
listingController.get('/get/:listing_id', asyncHandler(listingService.getListingById));
listingController.put('/:listing_id', asyncHandler(withUserDecoded), asyncHandler(listingService.listingUpdate));

module.exports = listingController;
