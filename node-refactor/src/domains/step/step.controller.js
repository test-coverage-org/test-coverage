const express = require('express');
const { asyncHandler } = require('@utils/errors');
const stepService = require('@src/domains/step/step.service');
const multer = require('multer');
const { stepSchema } = require('@src/domains/step/step.schema');
const { validateBody } = require('@src/middlewares/validation.middleware');
const upload = multer({ dest: 'uploads/' });

const stepController = express.Router();

stepController.post('/create/:listing_id', validateBody(stepSchema), asyncHandler(stepService.createStep));
stepController.post('/create/bulk/:listing_id', upload.single('file'), asyncHandler(stepService.createStepsBulk));

module.exports = stepController;
