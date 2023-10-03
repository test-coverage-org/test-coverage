/* eslint-disable indent */
const stepRepository = require('@src/domains/step/step.repository');
const { NotSupportedFile, ParsingFileError } = require('@utils/errors');
const logger = require('@utils/logger');
const { parseCsv, parseXlsx, parseJson, parseJs } = require('@src/domains/step/step.parsers');

// Validate the steps given by the user file
function validateSteps(steps) {
  const errors = [];

  steps.forEach((step, index) => {
    if (!step.flowId) errors.push({ row: index + 1, field: 'flowId', message: 'Flow ID is required' });
    if (!step.name) errors.push({ row: index + 1, field: 'name', message: 'Step name is required' });
    if (!step.step) errors.push({ row: index + 1, field: 'step', message: 'Step data is required' });
    if (!step.listingFlow) errors.push({ row: index + 1, field: 'listingFlow', message: 'Listing flow is required' });
  });

  return errors;
}

// Resolve the steps file parser based on the file extension
const resolveStepsFileParser = async (file) => {
  const extension = file.originalname.split('.').pop().toLowerCase();
  try {
    logger.debug(`file extension: ${extension}`);
    switch (extension) {
      case 'csv':
        return await parseCsv(file); //
      case 'xlsx':
        return await parseXlsx(file);
      case 'json':
        return await parseJson(file);
      case 'js':
        return await parseJs(file);
      default:
        throw new NotSupportedFile(extension);
    }
  } catch (error) {
    throw new ParsingFileError(error.message, extension || 'unknown');
  }
};

module.exports = {
  async createStep(req, res) {
    const { body, params } = req;

    const step = await stepRepository.createStep(body, params.listing_id);

    res.status(201).json(step);
  },

  async createStepsBulk(req, res) {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }
    const listingId = req.params.listing_id;

    const steps = await resolveStepsFileParser(req.file);

    // Validate the steps before inserting them into the database
    const errors = validateSteps(steps);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Insert the steps into the database
    const stepsSaved = await stepRepository.bulkCreateSteps(steps, listingId);
    return res.status(201).json(stepsSaved);
  },
};
