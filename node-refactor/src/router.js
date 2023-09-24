const express = require('express');
const countryController = require('@src/domains/country/country.controller');
const listingController = require('@src/domains/listing/listing.controller');
const stepController = require('@src/domains/step/step.controller');

const mainRouter = express.Router();

mainRouter.use('/country', /*withAuthUser,*/ countryController);
mainRouter.use('/listing', /*withAuthUser,*/ listingController);
mainRouter.use('/step', /*withAuthUser,*/ stepController);

mainRouter.get('/healthcheck', (req, res) => res.status(200).send('OK'));

module.exports = mainRouter;
