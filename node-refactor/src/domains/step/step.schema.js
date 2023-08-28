const Joi = require('joi');

const stepSchema = Joi.object({
  flowId: Joi.number().required(),
  name: Joi.string().trim().required(),
  step: Joi.object().required(),
  listingFlow: Joi.object().required(),
});

module.exports = { stepSchema };
