require('module-alias/register'); // Register module aliases

const app = require('@src/server');
const { Constants } = require('@utils/constants');
const logger = require('@utils/logger');

app.listen(Constants.PORT, function () {
  logger.info(`Server listening on port ${Constants.PORT}`);
});
