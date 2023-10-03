const logger = require('@utils/logger');

const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    logger.error(error);
    res.status(400).json({
      error: 'Invalid input data',
      details: error.details.map((detail) => detail.message),
    });
  } else {
    next();
  }
};

module.exports = {
  validateBody,
};
