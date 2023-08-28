const express = require('express');
const countryService = require('@src/domains/country/country.service');
const { asyncHandler } = require('@utils/errors');

const countryController = express.Router();

countryController.get('/get-all', asyncHandler(countryService.getAllCountries));

module.exports = countryController;
